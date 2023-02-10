import { GraphQLmiddlewareFunc, Resolver } from "../types/graphql-utils";

export const createMiddleware = (middlewareFunc: GraphQLmiddlewareFunc, resolverFunc: Resolver) => (
    parent: any, args: any, context: any, info: any) => (middlewareFunc(resolverFunc, parent, args, context, info))