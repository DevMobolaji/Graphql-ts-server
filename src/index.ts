import "reflect-metadata"

import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
//import { loadFile } from 'graphql-import-files';
import { resolvers } from "./resolver"
import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { AppDataSource, TestDevSource } from "./data-source"


export const startServer = async () => {
  const typeDefs = loadSchemaSync(path.join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] })

  const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers })
})

  await AppDataSource.initialize()
  await TestDevSource.initialize()
  
  const server = createServer(yoga)

  server.listen(8000, () => {
    console.info('Server is running on http://localhost:8000/graphql');
  })
}

startServer();

