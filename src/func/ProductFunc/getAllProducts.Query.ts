import { AppDataSource } from "../../data-source"
import { Product } from "../../entity/Products"
import { GraphQLError } from "graphql";
import { Review } from "../../entity/Review";
//import { Review } from "../../entity/Review";

export const getAllProduct = async () => {
    const query = AppDataSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
        .leftJoinAndSelect("products.user", "user")
        .leftJoinAndSelect("products.reviews", "reviews")

    const products = await query.getMany()
    return products
}

export const getProductByFilter = async (filter: any) => {

    const query = AppDataSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
        .leftJoinAndSelect("products.user", "user")
        .leftJoinAndSelect("products.reviews", "review")

    if (filter) {
        const { onSale, avgRating } = filter;

        if (onSale) {
            const query = AppDataSource
                .getRepository(Product)
                .createQueryBuilder("products")
                .where("products.onSale = :onSale", { onSale })
                .leftJoinAndSelect("products.category", "category")
                .leftJoinAndSelect("products.user", "user")
                .leftJoinAndSelect("products.reviews", "review")

            const products = await query.getMany()
            return products;
        }

        if ([1, 2, 3, 4, 5].includes(avgRating)) {
            const products = await Product.find({
                relations: {
                    reviews: true,
                    user: true
                }
            })

            const reviews = await Review.find({
                relations: {
                    product: true,
                    user: true
                }
            })

            const p = products.filter((product) => {
                let sumRating: Number = 0;
                let numberOfReviews = 0;

                reviews.forEach((review) => {

                    if (review.product.id === product.id) {
                        sumRating += (review.rating as any)
                        numberOfReviews++;
                    }
                })

                const avgProductRating = (sumRating as any) / numberOfReviews;

                return avgProductRating >= avgRating;
            })

            return p
        }
    }

    const products = await query.getMany()

    return products;
}

export const getProductById = async (id: any) => {
    const product = await Product.findOne({
        where:
            { id },
        relations: {
            category: true,
            user: true,
            reviews: true,
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
    return product
}