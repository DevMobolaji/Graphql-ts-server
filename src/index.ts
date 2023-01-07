import "reflect-metadata"

import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
//import { loadFile } from 'graphql-import-files';
import { resolvers } from "./resolver"
import { createConnection } from "typeorm";
import * as path from "path"
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'


const typeDefs = loadSchemaSync(path.join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] })
  
const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers })
})

const server = createServer(yoga)

createConnection().then(() => {
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  })
});

