
import { Query } from "../../generated-types/graphql";
import {
    resolverMap
} from "../../types/graphql-utils";

export const resolvers: resolverMap = {
    Query: {
        hello: (_, args: Query, { url }) => {
            console.log(url)
            return `Hello from ${args} || world`
        }
    },
}