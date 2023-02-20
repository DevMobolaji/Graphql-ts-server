import { resolverMap } from "../../types/graphql-utils";
import { getAllProduct, getProductByFilter, getProductById } from "../../func/ProductFunc/getAllProducts.Query";
import { createProdMutation } from "../../func/ProductFunc/createProd.Mutation";
import { Product } from "../../entity/Products";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth_AdminAccess, requiresAuth } from "../../MiddlewareFunc/middlewareFunc"
import { updateProductMutation } from "../../func/ProductFunc/updateProduct.Mutation";
import { Review } from "../../entity/Review";
import { deleteProductMutation } from "../../func/ProductFunc/deleteProduct.Mutation";
import { MutationAddProductArgs, MutationDeleteProductArgs, MutationUpdateProductArgs, QueryProductArgs } from "../../generated-types/graphql";

export const resolvers: resolverMap = {
    Product: {
        reviews: async (parent) => {
            const review = await Review.find({
                relations: {
                    product: true
                }
            })
            return review.filter((review) => review.product.id === parent.id)
        },
    },

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
        AddProduct: createMiddleware(requiresAuth_AdminAccess, async (_, args: MutationAddProductArgs, { session }) => {
            const { userId, userType } = session

            if (!userId) return null;
            if (userType !== "ADMIN") return null;

            const { input } = args;
            const { name, description, price, image, quantity, onSale, categoryId } = input;

            return await createProdMutation(name, description, price, image, quantity, onSale, categoryId, userId)
        }),
        updateProduct: createMiddleware(requiresAuth_AdminAccess, async (_, args: MutationUpdateProductArgs) => {
            const { input, id } = args;

            return await updateProductMutation(id, input)
        }),
        deleteProduct: createMiddleware(requiresAuth, async (_, args: MutationDeleteProductArgs, { session }) => {
            const { userId } = session;
            const { id } = args;

            if (!userId) return null;

            return await deleteProductMutation(id)
        })
    },
}