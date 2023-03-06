import { GraphQLError } from "graphql";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Products";
import { CartItem } from "../../entity/cartItem";
import { createCart } from "./createCart";


export const createCartFunc = async (productId: any, quantity: number, userId: string) => {
    const product = await Product.findOne({
        where: { id: productId }
    })

    if (!product) {
        throw new GraphQLError("There's no product with that ID", {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "product"
            }
        })
    }

    const cart = await createCart(userId)

    const existingCartItem = cart?.items.find((cartItem: { product: { id: string; }; }) => cartItem.product.id === productId)
    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save()
    } else {
        const newCart = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(CartItem)
            .values([
                { quantity, product: productId, cart: cart },
            ])
            .returning("*")
            .execute()
        const rew = newCart.raw.map((cartItem: any) => cartItem)
        cart.items.push(rew[0]);
    }
    return cart;
}