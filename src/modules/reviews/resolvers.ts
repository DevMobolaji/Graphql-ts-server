import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth } from "../../MiddlewareFunc/middlewareFunc";
import { createReviewMutation } from "../../func/ReviewFunc/createReview.Mutation";
import { getAllReview, getReviewById } from "../../func/ReviewFunc/getAllReview.Query";
import { resolverMap } from "../../types/graphql-utils";

export const resolvers: resolverMap = {
    Mutation: {
        AddReview: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { userId } = session
            const { input } = args;

            if (!userId) return null;
            const { title, comment, rating, productId } = input;

            return await createReviewMutation(title, comment, rating, productId, userId)

        })
    },
    Query: {
        reviews: async () => {
            return await getAllReview()
        },
        review: async (_, args) => {
            const { id } = args;

            return await getReviewById(id)
        }
    }
}