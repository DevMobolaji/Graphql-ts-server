
import { Cart } from "../../entity/Cart";
import { CartItem } from "../../entity/cartItem";
import { resolverMap } from "../../types/graphql-utils";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth } from "../../MiddlewareFunc/middlewareFunc";
import { createCartFunc } from "../../func/CartFunc/addToCartMutation";
import { removeFromCartFunc } from "../../func/CartFunc/removeFromCartMutation";

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
        carts: async (_, __, { session }) => {
            const { userId } = session;

            const cart = await Cart.findOne({
                where: { user: { id: userId } },
                relations: ['items.product', "user"]
            })

            return cart?.items
        }
    },

    Mutation: {
        addItem: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { userId } = session;
            const { input } = args
            const { productId, quantity } = input;

            if (!userId) return null;
            return await createCartFunc(productId, quantity, userId)

        }),
        removeFromCart: async (_, args, { session }) => {
            const { cartItemId } = args
            const { userId } = session;

            if (!userId) return null;
            return await removeFromCartFunc(cartItemId, userId)
        }
    },
}
