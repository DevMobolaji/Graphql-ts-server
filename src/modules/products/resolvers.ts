import { QueryProductArgs } from "../../generated-types/graphql";
import { resolverMap } from "../../types/graphql-utils";
import { getAllProduct, getProductByFilter, getProductById } from "../../func/ProductFunc/getAllProducts.Query";
import { createProdMutation } from "../../func/ProductFunc/createProd.Mutation";
import { Product } from "../../entity/Products";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth_AdminAccess, requiresAuth } from "../../MiddlewareFunc/middlewareFunc"
import { updateProductMutation } from "../../func/ProductFunc/updateProduct.Mutation";

export const resolvers: resolverMap = {
    Query: {
        products: createMiddleware(requiresAuth, async (_, __, { session }) => {
            const { userId } = session;

            if (!userId) return null;
            return await getAllProduct()
        }),
        productsByFilter: createMiddleware(requiresAuth, async (_, { filter }, { session }): Promise<Product[] | null> => {
            const { userId } = session;

            if (!userId) return null;
            return await getProductByFilter(filter);
        }),
        product: createMiddleware(requiresAuth, async (_, args: QueryProductArgs, { session }) => {
            const { id } = args;
            const { userId } = session;

            if (!userId) return null;
            return await getProductById(id)
        }),
    },
    Mutation: {
        AddProduct: createMiddleware(requiresAuth_AdminAccess, async (_, args, { session }) => {
            const { userId, userType } = session

            if (!userId) return null;
            if (userType !== "ADMIN") return null;

            const { input } = args;
            const { name, description, price, image, quantity, onSale, categoryId } = input;

            return await createProdMutation(name, description, price, image, quantity, onSale, categoryId, userId)
        }),
        updateProduct: createMiddleware(requiresAuth_AdminAccess, async (_, args: { id: any, input: any }) => {
            const { input, id } = args;

            return await updateProductMutation(id, input)
        })
    },
}