import "reflect-metadata"
import express from 'express'
import { createTypeormConn } from "./utils/createTypeormConn"
import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"
import { ApolloServer } from '@apollo/server'
//import https from "https"
import http from "http"
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
// import passport from "passport"
// import { Strategy } from "passport-google-oauth20"
// import { verifyCallback } from "./Restful routes/verifyCallback"

// import rateLimit from 'express-rate-limit'
// import rateLimitRedisStore from "rate-limit-redis";

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
    await createTypeormConn()


    // const httpServer = https.createServer({
    //     key: fs.readFileSync('./src/ssl/server.pem'),
    //     cert: fs.readFileSync('./src/ssl/cert.pem'),
    // }, app);

    // const config = {
    //     CLIENT_ID: sanitizedConfig.CLIENT_ID,
    //     SECRET_CLIENT: sanitizedConfig.SECRET_CLIENT
    // }

    //SERVER STARTRUP
    const server = new ApolloServer({
        schema,
        plugins:
            [
                ApolloServerPluginDrainHttpServer({ httpServer })
            ]
    });

    await server.start()

    //PASSPORT CONFIG FOR GOOGLE AUTH
    // app.use(passport.initialize())

    // const AUTH_OPTIONS = {
    //     callbackURL: 'https://localhost:4000/auth/google/callback',
    //     clientID: config.CLIENT_ID,
    //     clientSecret: config.SECRET_CLIENT
    // }

    // passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

    //EXPRESS MIDDLEWARE
    app.use(helmet());
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

    app.use("/graphql",
        cors<cors.CorsRequest>({
            origin: sanitizedConfig.NODE_ENV === "test" ? "*" : "http://localhost:5000/",
            credentials: true
        }),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ redis, req: req, session: req.session, url: req.protocol + "://" + req.get("host") })
        })
    );

    // app.get("/auth/google",
    //     passport.authenticate("google", {
    //         scope: ["email", "profile"]
    //     })
    // )

    // app.get("/auth/google/callback", passport.authenticate("google", {
    //     session: false
    // }), (req: Request, res: Response) => {
    //     (req.session as any).userId = (req.user as any).id;
    //     // @todo redirect to frontend
    //     res.redirect("http://localhost:4000");
    //     console.log("Google called us back")
    // })

    // const limiter = rateLimit({
    //     windowMs: 15 * 60 * 1000, // 15 minutes
    //     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    //     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    //     legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    //     store: new rateLimitRedisStore({})
    // })

    // app.use(limiter)

    await new Promise<void>((resolve) => httpServer.listen({ port: sanitizedConfig.PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:5000/`);
}


