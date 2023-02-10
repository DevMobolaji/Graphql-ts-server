import { resolverMap } from "../../types/graphql-utils";
import { getAllCategory, getCategoryById } from "../../func/CategoryFunc/getAllCategory.Query.ts";
import { createCategoryFunc } from "../../func/CategoryFunc/createCat.Mutation";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import middleware from "../../MiddlewareFunc/middlewareFunc"

export const resolvers: resolverMap = {
    Query: {
        categories: createMiddleware(middleware, async () => {
            return await getAllCategory()
        }),
        category: createMiddleware(middleware, async (_, args) => {
            const { id } = args;
            return await getCategoryById(id)
        }),
    },

    Mutation: {
        AddCategory: createMiddleware(middleware, async (_: any, args: { input: any; }) => {
            const { input } = args;
            const name = input?.name
            return await createCategoryFunc(name)
        })
    }
}