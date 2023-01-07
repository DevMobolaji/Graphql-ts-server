import "reflect-metadata"

import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { loadFile } from 'graphql-import-files';
//import { resolvers } from "./resolver"


const typeDefs = loadFile('./schema.graphql') 

const yoga = createYoga({
  //schema: createSchema({ typeDefs, resolvers }),
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})