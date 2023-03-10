
//import { CartItem } from "../../entity/cartItem";
import { resolverMap } from "../../types/graphql-utils";
import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth } from "../../MiddlewareFunc/middlewareFunc";
import { createCartFunc } from "../../func/CartFunc/addToCartMutation";
import { removeFromCartFunc } from "../../func/CartFunc/removeFromCartMutation";
import { Cart } from "../../entity/Cart";
import { CartItem } from "../../entity/cartItem";


export const resolvers: resolverMap = {
    Cart: {
        cartItem: createMiddleware(requiresAuth, async (_, __, { session }) => {
            const { userId } = session
            const cartitem = await CartItem.findOne({
                where: { cart: { user: { id: userId } } },
                relations: {
                    product: true
                }
            })
            return cartitem
        })
    },

    Query: {
        carts: createMiddleware(requiresAuth, async (_, __, { session }) => {
            const { userId } = session;

            const cart = await Cart.findOne({
                where: { user: { id: userId } },
                relations: ['items', 'items.product']
            })

            if (!userId) return null;

            return cart?.items
        }),
    },

    Mutation: {
        addItem: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { userId } = session;
            const { input } = args
            const { productId, quantity } = input;

            if (!userId) return null;

            return await createCartFunc(productId, quantity, userId)
        }),
        removeFromCart: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { cartItemId } = args
            const { userId } = session;

            if (!userId) return null;
            return await removeFromCartFunc(cartItemId, userId)
        })
    },
}
