import express = require("express")
import { createTypeormConn } from "./utils/createTypeormConn"
//import sanitizedConfig from "./config"

import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"
import { ApolloServer } from '@apollo/server'
import http from "http"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { expressMiddleware } from "@apollo/server/express4"
import { json } from 'body-parser';
import sanitizedConfig from "./config"
import { redis } from "./redis"

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
    const schema = mergeSchemas({ schemas })
    const app = express();

    const httpServer= http.createServer(app)

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start()

    app.use("",
        json(),
        expressMiddleware(server, {
        context: async ({ req }) => ({ redis, req: req, url: req.protocol + "://" + req.get("host")})
    }))

    await createTypeormConn()
    
    const serv = app.listen({ port: sanitizedConfig.PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:4000`);
    })
    //const serv = await new Promise<void>((resolve) => httpServer.listen({ port: sanitizedConfig.PORT }, resolve))
    // console.log(`🚀 Server ready at http://localhost:4000/`);

    return serv
}


