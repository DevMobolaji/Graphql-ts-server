import { Resolver } from "../types/graphql-utils";
import { GraphQLError } from "graphql/error";
import { User } from "../entity/User";

export default async (
    resolver: Resolver,
    parent: any,
    args: any,
    context: any,
    info: any
) => {
    const result = await resolver(parent, args, context, info);

    if (!context.session || !context.session.userId) {
        throw new GraphQLError("You must be authenticated to gain Access", {
            extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                argument: "AUTH_TYPE"
            }
        })
    }

    const user = await User.findOne({ where: { id: context.session.userId } })
    const usertype = ((user as any).userType)

    if (usertype !== "ADMIN") {
        throw new GraphQLError("Admin authorization required", {
            extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                argument: "USERTYPE"
            }
        })
    }
    return result;
};

// const createResolver = (resolver: any) => {
//     const baseResolver = resolver

//     baseResolver.createResolver = (childResolver: (parent: any, args: any, context: any, info: any) => any) => {
//         const newResolver = async (parent: any, args: any, context: any, info: any) => {
//             await resolver(parent, args, context, info);
//             return childResolver(parent, args, context, info)
//         }

//         return createResolver(newResolver)
//     }
//     return baseResolver
// }

// export const isAuthenticated = createResolver((_parent: any, _args: any, context: any, _info: any) => {
//     if (!context.session || !context.session.userId) {
//         throw new GraphQLError("You must be logged in", {
//             extensions: {
//                 code: "GRAPHQL_VALIDATION_FAILED",
//                 argument: "cookies"
//             }
//         })
//     }
// })

// export const isAdmin = createResolver(async (_: any, __: any, context: any) => {
//     const user = await User.findOne({ where: { id: context.session.userId } })
//     const usertype = ((user as any).userType)

//     if (usertype !== "ADMIN") {
//         throw Error("Requires admin access")
//     }
// })

