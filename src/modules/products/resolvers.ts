import { QueryProductArgs } from "../../generated-types/graphql";
import { resolverMap } from "../../types/graphql-utils";
import { getAllProduct, getProductByFilter, getProductById } from "../../func/ProductFunc/getAllProducts.Query";
import { createProdMutation } from "../../func/ProductFunc/createProd.Mutation";
import { Product } from "../../entity/Products";
// import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
// import middleware from "../../MiddlewareFunc/middlewareFunc"

export const resolvers: resolverMap = {
    Query: {
        products: async (_) => {
            return await getAllProduct()
        },
        productsByFilter: async (_, { filter }): Promise<Product[]> => {
            return await getProductByFilter(filter);
        },
        product: async (_, args: QueryProductArgs) => {
            const { id } = args
            return await getProductById(id)
        },
    },
    Mutation: {
        AddProduct: async (_, args, { session }) => {
            const { userId } = session
            const { input } = args;
            const { name, description, price, image, quantity, onSale, categoryId } = input;
            return await createProdMutation(name, description, price, image, quantity, onSale, categoryId, userId)
        }
    },
}