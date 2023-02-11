import { GraphQLError } from "graphql/error";
import { Resolver } from "../../types/graphql-utils";

export default async (resolver: Resolver, ...params: any[]) => {

    const res = await resolver(params[0], params[1], params[2], params[3]);

    if (!params[2].session || !params[2].session.userId) {
        throw new GraphQLError("You must be logged in", {
            extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                argument: "cookies"
            }
        })
    }
    return res
}

