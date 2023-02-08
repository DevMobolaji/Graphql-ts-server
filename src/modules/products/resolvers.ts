import { QueryProductArgs } from "../../generated-types/graphql";
import { resolverMap } from "../../types/graphql-utils";
import { getAllProduct, getProductByFilter, getProductById } from "../../func/getAllProducts.Query";
import { createProdMutation } from "../../func/createProd.Mutation";

export const resolvers: resolverMap = {
    Query: {
        products: async (_) => {
            return await getAllProduct()
        },
        productsByFilter: async (_, { filter }) => {
            console.log(filter)
            return await getProductByFilter(filter)
        },
        product: async (_, args: QueryProductArgs) => {
            const { id } = args
            return await getProductById(id)
        },
    },
    Mutation: {
        AddProduct: async (_, args): Promise<{ path: string; message: string; }[] | null> => {
            const { input } = args;
            const { name, description, price, image, quantity, onSale, categoryId } = input;
            return await createProdMutation(name, description, price, image, onSale, quantity, categoryId)
        }
    }
}