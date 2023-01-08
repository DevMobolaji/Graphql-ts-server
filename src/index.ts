import "reflect-metadata"

import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
//import { loadFile } from 'graphql-import-files';
import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { AppDataSource, TestDevSource } from "./data-source"
import * as fs from "fs"
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { GraphQLSchema } from "graphql"

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

    const yoga = createYoga({ schema: mergeSchemas({ schemas }) })

  await AppDataSource.initialize()
  await TestDevSource.initialize()
  
  const server = createServer(yoga)

  server.listen(8000, () => {
    console.info('Server is running on http://localhost:8000/graphql');
  })
}

startServer();

