import "reflect-metadata"
import { startServer } from "./startServer"

startServer()
// import "reflect-metadata"

// import { createSchema, createYoga } from 'graphql-yoga'
// import { createServer } from 'node:http'
// const { loadFiles } = require('@graphql-tools/load-files')
// import { resolvers } from "./resolvers"


// const typeDefs = loadFiles('./schema.graphql') 

// const yoga = createYoga({
//   schema: createSchema({ typeDefs, resolvers })
// })

// const server = createServer(yoga)

// server.listen(4000, () => {
//   console.info('Server is running on http://localhost:4000/graphql')
// })