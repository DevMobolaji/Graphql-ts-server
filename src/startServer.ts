import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import sanitizedConfig from './config';
import { redis } from './redis';
import * as path from "path"
import * as fs from "fs"
import { createTypeormConn } from './utils/createTypeormConn';

export const startServer = async () => {
    const schemas: GraphQLSchema[] = []
    const folders = fs.readdirSync(path.join(__dirname, "./modules"));


    folders.forEach(folder => {
        const { resolvers } = require(`./modules/${folder}/resolvers`)
        const typeDefs = loadSchemaSync(path.join(__dirname, `./modules/${folder}/typedefs/*.graphql`), { loaders: [new GraphQLFileLoader()] })

        schemas.push(makeExecutableSchema({
            typeDefs,
            resolvers
        }))
    })

    if (sanitizedConfig.NODE_ENV === "Test") {
        redis.flushdb()
        redis.flushall()
    }


    const schema = mergeSchemas({ schemas })

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins:
            [
                ApolloServerPluginDrainHttpServer({ httpServer })
            ]
    });

    await createTypeormConn()

    await server.start();
    app.use(
        '',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ redis, req: req, session: req.session, url: req.protocol + "://" + req.get("host") }),
        }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
}