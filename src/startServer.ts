import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import { createTypeormConn } from "./utils/createTypeormConn"
import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"
import { ApolloServer } from '@apollo/server'
import https from "https"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { expressMiddleware } from "@apollo/server/express4"
import { json } from 'body-parser';
import sanitizedConfig from "./config"
import { redis } from "./redis"
import session from "express-session"
let RedisStore = require("connect-redis")(session)
import cors from "cors"
import { redisSessionPrefix } from "./constants"
import helmet from "helmet"
// import rateLimit from 'express-rate-limit'
// import rateLimitRedisStore from "rate-limit-redis";

//CLIENT ID 273549184185-pd80jdb5gi4nud6smdm9oiuog80e1kab.apps.googleusercontent.com
//SECRET CLIENT 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


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
    await createTypeormConn()


    const httpServer = https.createServer({
        key: fs.readFileSync('./src/ssl/server.pem'),
        cert: fs.readFileSync('./src/ssl/cert.pem'),
    }, app);

    const config = {
        CLIENT_ID: sanitizedConfig.CLIENT_ID,
        SECRET_CLIENT: sanitizedConfig.SECRET_CLIENT
    }

    const server = new ApolloServer({
        schema,
        plugins:
            [
                ApolloServerPluginDrainHttpServer({ httpServer })
            ]
    })

    await server.start()

    app.get("/rest", (_req, res) => {
        res.json({
            data: "API is working...",
        });
    });

    app.get("/auth/google", (req: Request, res: Response) => {

    })

    app.get("/auth/google/callaback", (req: Request, res: Response, next: NextFunction) => {

    })


    app.use(
        session({
            store: new RedisStore({
                client: redis, prefix: redisSessionPrefix
            }),
            name: "qid",
            secret: "hjkfgjklajkjsmjlgvfjhd",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                //secure: true,
                secure: sanitizedConfig.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                sameSite: "None"
            }
        } as any)
    );

    // const limiter = rateLimit({
    //     windowMs: 15 * 60 * 1000, // 15 minutes
    //     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    //     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    //     legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    //     store: new rateLimitRedisStore({})
    // })

    // app.use(limiter)


    app.use("",
        cors<cors.CorsRequest>({
            origin: sanitizedConfig.NODE_ENV === "Test" ? "*" : "http://localhost:4000",
            credentials: true
        }),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ redis, req: req, session: req.session, url: req.protocol + "://" + req.get("host") })
        })
    )
    app.use(helmet())


    await new Promise<void>((resolve) => httpServer.listen({ port: sanitizedConfig.PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000/`);
}


