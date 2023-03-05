import { CartItem } from "../../entity/cartItem";

export const removeFromCartFunc = async (cartItemId: any, userId: any) => {
    const cartitm = await CartItem.findOne({ where: { id: cartItemId, cart: { user: { id: userId } } }, relations: ['cart.items'] })

    //Check if the cart item exists
    const cartItemIndex = cartitm?.cart.items.findIndex(
        (item) => item.id === cartItemId
    );

    if (cartItemIndex === -1 || cartItemIndex === undefined) {
        throw new Error(`Cart item with id ${cartItemId} not found`);
    }

    cartitm?.cart.items.splice((cartItemIndex as any), 1);

    await CartItem.remove((cartitm) as any)

    return true
}