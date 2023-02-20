import { TestDevSource } from "../../data-source"
import { Review } from "../../entity/Review"
import { GraphQLError } from "graphql/error/GraphQLError"

export const deleteReviewMutation = async (id: any) => {
    const review = await Review.findOne({ where: { id } })

    if (!review) {
        throw new GraphQLError(`There's no review with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "review"
            }
        })
    }

    await TestDevSource
        .createQueryBuilder()
        .delete()
        .from(Review)
        .where("id = :id", { id })
        .execute()

    return true
}