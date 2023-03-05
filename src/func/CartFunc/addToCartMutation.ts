import { GraphQLError } from "graphql";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Products";
import { CartItem } from "../../entity/cartItem";
import { createCart } from "./createCart";


export const createCartFunc = async (productId: any, quantity: any, userId: any) => {
    const product = await Product.findOne({
        where: { id: productId },
        relations: {
            category: true,
            reviews: true,
            user: true
        }
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

    const existingCartItem = cart?.items.find((cartItem: { product: { id: any; }; }) => cartItem.product.id === productId)
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
        cart.items.push(newCart.raw);
    }
    return cart;
}