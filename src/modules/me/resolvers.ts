import { User } from "../../entity/User";
import { resolverMap } from "../../types/graphql-utils";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";


export const resolvers: resolverMap = {
    Query: {
        me: createMiddleware(middleware, async (_, __, { session }) => {
            return await User.findOne({ where: { id: session.userId } })
        }
        )
    }
}