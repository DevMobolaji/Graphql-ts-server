

import { Cart } from "../../entity/Cart";


import { CartItem } from "../../entity/cartItem";
import { resolverMap } from "../../types/graphql-utils";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth } from "../../MiddlewareFunc/middlewareFunc";
import { createCartFunc } from "../../func/CartFunc/addToCartMutation";

export const resolvers: resolverMap = {
    Cart: {
        cartItem: async () => {
            const cartitem = await CartItem.find({
                relations: {
                    product: true
                }
            })
            return cartitem
        }
    },

    Query: {
        Cart: async () => {
            const cartItem = await Cart.find({
                relations: {
                    items: true,
                    user: true
                }
            })
            return cartItem
        }
    },

    Mutation: {
        addItem: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { userId } = session;
            const { input } = args
            const { productId, quantity } = input;

            if (!userId) return null;
            return await createCartFunc(productId, quantity, userId)

        })
    }
}
