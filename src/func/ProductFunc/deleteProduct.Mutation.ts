import { TestDevSource } from "../../data-source"
import { GraphQLError } from "graphql/error/GraphQLError"
import { Product } from "../../entity/Products"

export const deleteProductMutation = async (id: any) => {
    const product = await Product.findOne({ where: { id } })

    if (!product) {
        throw new GraphQLError(`There's no product with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "product"
            }
        })
    }

    await TestDevSource
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where("id = :id", { id })
        .execute()

    return true
}