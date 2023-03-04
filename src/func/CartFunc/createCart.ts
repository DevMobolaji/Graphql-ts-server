import { Cart } from "../../entity/Cart"

export const createCart = async (userId: any) => {
    const cart = await Cart.findOne({
        where: { user: { id: userId } },
        relations: ['items', 'items.product', "user"]
    })

    if (!cart) {
        const res = Cart.create({
            user: (userId as any), items: []
        })
        await res.save()
        return res
    }

    return cart
}
