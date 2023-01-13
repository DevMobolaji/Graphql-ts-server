import { createYoga } from 'graphql-yoga'

import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"
//import Redis from "ioredis"
import express = require("express")
//import from "express"
//import { User } from "./entity/User"
import { createTypeormConn } from "./utils/createTypeormConn"
import sanitizedConfig from "./config"

export const startServer = async () => {
    const schemas: GraphQLSchema[] = []
    const folders = fs.readdirSync(path.join(__dirname, "./modules"));

    folders.forEach(folder => {
        const { resolvers } = require(`./modules/${folder}/resolvers`)
        const typeDefs = loadSchemaSync(path.join(__dirname, `./modules/${folder}/schema.graphql`), { loaders: [new GraphQLFileLoader()] })
    
        schemas.push(makeExecutableSchema({
            typeDefs,
            resolvers
        }))
    })
    //const redis = new Redis();
    const app = express();

    const server = createYoga({
        schema: mergeSchemas({ schemas }),
        //context: ({ request }) => ({ redis, url: request})
    
    })

    await createTypeormConn()
  
    app.use('/graphql', server)
  
    // app.get("/confirm/:id", async (req, res) => {
    //   const { id } = req.params;
    //     const userId = await redis.get(id)
    //     if (userId) {
    //         await User.update({ id: userId as any }, { confirmed: true });
    //         res.status(200).send('ok')
    //     } else {
    //         res.status(404).send("Invalid")
    //     }
    // })

    // const port = sanitizedConfig.NODE_ENV === " Test" ? 0 : 4000
    // console.log(sanitizedConfig)

    const serv = app.listen(sanitizedConfig.PORT, () => {
        console.info('Server is running on http://localhost:4000/graphql');
    })

  return serv;
}

