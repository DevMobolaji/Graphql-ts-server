import { GraphQLError } from "graphql/error/GraphQLError"
import { Category } from "../../entity/Category"
import { AppDataSource } from "../../data-source"

export const updateCategoryMutation = async (id: any, input: any) => {
    const { name } = input

    const cte = await Category.findOne({ where: { id } })

    if (!cte) {
        throw new GraphQLError(`There's no category with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "category"
            }
        })
    }

    if (!name) {
        throw new GraphQLError("You must provide a category name", {
            extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                argument: "category"
            }
        })
    }

    await AppDataSource
        .createQueryBuilder()
        .update(Category)
        .set({ name: name })
        .where("id = :id", { id })
        .returning("*")
        .execute()

    return null;
}