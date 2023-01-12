import "reflect-metadata"

import { createYoga } from 'graphql-yoga'

import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"
//import Redis from "ioredis"
import express = require("express")
//import { User } from "./entity/User"
import { createTypeormConn } from "./utils/createTypeormConn"

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
    schema: mergeSchemas({ schemas })
    
  })

  await createTypeormConn()
  
  app.use('/graphql', server)
  
  // app.get("/confirm/:id", async (req, res) => {
  //   const { id } = req.params;
  //   //const userId = await redis.get(id)
    
  //   await User.update({ id: userId as any }, { confirmed: true });
  //   res.send("ok")
  // })

  app.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  })
}

startServer();

