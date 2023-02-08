import { TestDevSource } from "../data-source"
import { Product } from "../entity/Products"

export const getAllProduct = async () => {
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")

    const products = await query.getMany()
    return products
}

export const getProductByFilter = async (filter: any) => {
    const query = TestDevSource
        .getRepository(Product)
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.category", "category")
    const { onSale } = filter

    if (onSale) {
        const query = TestDevSource
            .getRepository(Product)
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.category", "category")
            .where("products.onSale = :onSale", { onSale })

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
    return product
}