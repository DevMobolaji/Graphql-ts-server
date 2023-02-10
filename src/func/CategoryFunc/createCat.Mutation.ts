import { GraphQLError } from "graphql";
import { Category } from "../../entity/Category";

export const createCategoryFunc = async (name: any): Promise<Category> => {
    if (!name) {
        throw new GraphQLError("You must provide a category name", {
            extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                argument: "category"
            }
        })
    }

    const category = Category.create({
        name
    });
    await category.save();
    return category
}