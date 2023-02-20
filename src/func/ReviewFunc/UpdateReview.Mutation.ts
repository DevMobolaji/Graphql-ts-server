import { Product } from "../../entity/Products";
import { Review } from "../../entity/Review";
import { GraphQLError } from "graphql/error/GraphQLError"

export const updateReviewMutation = async (id: any, input: any) => {
    const { title, rating, comment, productId } = input;
    console.log(id)

    const review = await Review.findOne({ where: { id } })

    const reviewid = productId
    console.log(reviewid)

    const product = await Product.findOne({ where: { id: reviewid } })

    if (!product) {
        throw new GraphQLError(`There's no product with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "product"
            }
        })
    }

    if (!review) {
        throw new GraphQLError(`There's no review with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "review"
            }
        })
    }

    const reviews = {
        title,
        comment,
        rating,
        product: productId,
    }

    await Review.update({ id: id }, reviews)
    return null
}