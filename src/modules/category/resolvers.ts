import { Category } from "../../entity/Category";
import { GraphQLError } from "graphql";
import { resolverMap } from "../../types/graphql-utils";

export const resolvers: resolverMap = {
    Query: {
        categories: async (): Promise<Category[]> => {
            const category = await Category.find({ relations: { products: true } });

            return category
        },
        category: (_, args) => {
            const { id } = args;
            const category = Category.findOne({
                where: { id }, relations: {
                    products: true
                }
            })

            if (!category) {
                throw new GraphQLError("There's no category with that id", {
                    extensions: {
                        code: "",
                        argument: "category"
                    }
                })
            }
            return category
        }
    },

    Mutation: {
        AddCategory: async (_, args) => {
            const { input } = args;
            const name = input?.name

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
    }
}