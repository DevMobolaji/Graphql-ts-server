import { Category } from "../../entity/Category";
import { Product } from "../../entity/Products"
import { GraphQLError } from "graphql/error/GraphQLError"

export const updateProductMutation = async (id: any, input: any) => {
    const { name, description, image, onSale, quantity, price, categoryId } = input;
    const product = await Product.findOne({ where: { id } })

    const categoryid = categoryId

    const cte = await Category.findOne({ where: { id: categoryid } })

    if (!cte) {
        throw new GraphQLError(`There's no category with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "category"
            }
        })
    }

    if (!product) {
        throw new GraphQLError(`There's no product with the give id ${id}`, {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "product"
            }
        })
    }

    const products = {
        name,
        description,
        price,
        image,
        quantity,
        onSale,
        category: categoryId,
    }

    await Product.update({ id: id }, products)
    return null

}