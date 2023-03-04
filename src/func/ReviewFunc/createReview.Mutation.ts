//import { TestDevSource } from "../../data-source";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Products";
import { Review } from "../../entity/Review";

export const createReviewMutation = async (title: any, comment: any, rating: any, productId: any, userId: any) => {
    try {
        if (!title || !comment || !rating || !productId) {
            return [{
                path: "product",
                message: "Please provide all input"
            }]
        }

        const id = productId

        const product = await Product.findOne({
            where: { id }, relations: {
                reviews: true,
                category: true
            }
        })

        if (!product) {
            return [{
                path: "Product",
                message: "Invalid product id"
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

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Review)
        .values([
            { title, comment, rating, product: productId, user: userId },
        ])
        .returning("*")
        .execute()

    return null;
}