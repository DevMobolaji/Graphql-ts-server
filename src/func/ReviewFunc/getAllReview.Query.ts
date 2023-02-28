import { GraphQLError } from "graphql/error/GraphQLError";
import { AppDataSource } from "../../data-source";
import { Review } from "../../entity/Review";

export const getAllReview = async () => {
    const query = AppDataSource
        .getRepository(Review)
        .createQueryBuilder("reviews")
        .leftJoinAndSelect("reviews.product", "product")
        .leftJoinAndSelect("reviews.user", "user")

    return await query.getMany()
}

export const getReviewById = async (id: any) => {
    const review = await Review.findOne({
        where: { id },
        relations: {
            product: true,
            user: true
        }
    })

    if (!review) {
        throw new GraphQLError("There's no review with that ID", {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "review"
            }
        })
    }
    return review;
}