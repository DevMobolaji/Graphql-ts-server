import { createMiddleware } from "../../MiddlewareFunc/createMiddleware";
import { requiresAuth } from "../../MiddlewareFunc/middlewareFunc";
import { updateReviewMutation } from "../../func/ReviewFunc/UpdateReview.Mutation";
import { createReviewMutation } from "../../func/ReviewFunc/createReview.Mutation";
import { deleteReviewMutation } from "../../func/ReviewFunc/deleteReview.Mutation";
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

        }),
        updateReview: createMiddleware(requiresAuth, async (_, args: { id: any, input: any }) => {
            const { input, id } = args;

            return await updateReviewMutation(id, input)
        }),
        deleteReview: createMiddleware(requiresAuth, async (_, args: { id: any }, { session }) => {
            const { userId } = session;
            const { id } = args;

            if (!userId) return null;

            return await deleteReviewMutation(id)
        })
    },
    Query: {
        reviews: createMiddleware(requiresAuth, async (_, __, { session }) => {
            const { userId } = session;

            if (!userId) return null;
            return await getAllReview()
        }),
        review: createMiddleware(requiresAuth, async (_, args, { session }) => {
            const { userId } = session;
            const { id } = args;

            if (!userId) return null;

            return await getReviewById(id)
        })
    }
}

