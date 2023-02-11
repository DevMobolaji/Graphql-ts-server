import { User } from "../../entity/User";
import { resolverMap } from "../../types/graphql-utils";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import middleware from "./middleware";


export const resolvers: resolverMap = {
    Query: {
        me: createMiddleware(middleware, async (_, __, { session }) => {
            const res = await User.findOne({ where: { id: session.userId } })
            return res
        }
        )
    }
}