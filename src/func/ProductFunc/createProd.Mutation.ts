//import { AppDataSource } from "../../data-source";
import { Category } from "../../entity/Category";
import { Product } from "../../entity/Products";

export const createProdMutation = async (name: string, description: string, price: number, image: string, quantity: number, onSale: boolean | any, categoryId: any, userId: any | string) => {
    try {
        if (!name || !description || !price || !image || !quantity || !categoryId) {
            return [{
                path: "product",
                message: "Please provide all input"
            }]
        }
        const id = categoryId
        console.log(id)

        const category = await Category.findOne({
            where: { id }, relations: {
                products: true
            }
        })

        if (!category) {
            return [{
                path: "Category",
                message: "Invalid category id"
            }]
        }

    } catch (error) {
        if (error.code === '22P02') {
            return [{
                path: "category",
                message: "Something bad happened! Please try again"
            }]
        }
    }

    // const product = await AppDataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Product)
    //     .values([
    //         { name, description, image, onSale: onSale, quantity, price, category: categoryId, user: userId },
    //     ])
    //     .returning("*")
    //     .execute()

    const product = Product.create({ name, description, image, onSale: onSale, quantity, price, category: categoryId, user: userId })
    await product.save()
    return null
}
