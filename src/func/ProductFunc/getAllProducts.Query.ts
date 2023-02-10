import { TestDevSource } from "../../data-source"
import { Product } from "../../entity/Products"
import { GraphQLError } from "graphql";

export const getAllProduct = async () => {
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
        .leftJoinAndSelect("products.user", "user")

    const products = await query.getMany()
    return products
}

export const getProductByFilter = async (filter: any) => {
    const { onSale } = filter;
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")

    if (onSale) {
        const query = TestDevSource
            .getRepository(Product)
            .createQueryBuilder("products")
            .where("products.onSale = :onSale", { onSale })
            .leftJoinAndSelect("products.category", "category")

        const products = await query.getMany()

        return products;
    }
    const products = await query.getMany()

    return products;
}

export const getProductById = async (id: any) => {
    const product = await Product.findOne({
        where:
            { id },
        relations: {
            category: true,
        }
    })

    if (!product) {
        throw new GraphQLError("There's no product with that ID", {
            extensions: {
                code: "BAD_USER_INPUT",
                argument: "product"
            }
        })
    }
    return product
}