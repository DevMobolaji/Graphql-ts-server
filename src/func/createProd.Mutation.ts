import { Product } from "../entity/Products";

export const createProdMutation = async (name: any, description: any, price: any, image: any, quantity: any, onSale: any, categoryId: any): Promise<{ path: string; message: string; }[] | null> => {
    if (!name || !description || !price || !image || !quantity || !categoryId) {
        return [{
            path: "product",
            message: "Please provide all input"
        }]
    }

    const product = Product.create({
        name,
        description,
        price,
        image,
        quantity,
        onSale,
        category: categoryId
    })

    await product.save()
    return null;
}
