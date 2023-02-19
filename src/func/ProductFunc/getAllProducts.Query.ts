import { TestDevSource } from "../../data-source"
import { Product } from "../../entity/Products"
import { GraphQLError } from "graphql";

export const getAllProduct = async () => {
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
        .leftJoinAndSelect("products.user", "user")
        .leftJoinAndSelect("products.reviews", "reviews")

    const products = await query.getMany()
    return products
}

export const getProductByFilter = async (filter: any) => {
    const { onSale } = filter;
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
        .leftJoinAndSelect("products.user", "user")
        .leftJoinAndSelect("products.reviews", "review")

    if (onSale) {
        const query = TestDevSource
            .getRepository(Product)
            .createQueryBuilder("products")
            .where("products.onSale = :onSale", { onSale })
            .leftJoinAndSelect("products.category", "category")
            .leftJoinAndSelect("products.user", "user")
            .leftJoinAndSelect("products.reviews", "review")

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
            user: true,
            reviews: true,
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