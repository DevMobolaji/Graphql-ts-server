import { User } from "../../entity/User";
import {
    resolverMap
} from "../../types/graphql-utils";
import * as bcryptjs from "bcryptjs"

export const resolvers: resolverMap = {
    Mutation: {
        register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            const hashedPass = await bcryptjs.hash(password, 10)
            const user = User.create({
                email,
                password: hashedPass
            })
            await user.save()
            return true
        }
        }
    };