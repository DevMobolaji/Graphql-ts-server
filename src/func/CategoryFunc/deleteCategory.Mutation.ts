import { AppDataSource } from "../../data-source"
import { Category } from "../../entity/Category"
import { GraphQLError } from "graphql/error/GraphQLError"

export const deleteCategoryMutation = async (id: any) => {
    const cte = await Category.findOne({ where: { id } })

    if (!cte) {
        throw new GraphQLError(`There's no category with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "category"
            }
        })
    }

    await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id })
        .execute()

    return true
}