import { Category } from "../../entity/Category";
import { GraphQLError } from "graphql";
//import { Product } from "../../entity/Products";

export const getAllCategory = async () => {
    const category = await Category.find({
        relations: {
            products: true
        }
    });

    return category
}

export const getCategoryById = async (id: any) => {
    const category = await Category.findOne({
        where: { id }, relations: {
            products: true
        }
    })

    if (!category) {
        throw new GraphQLError(`There's no category with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "category"
            }
        })
    }
    return category
}