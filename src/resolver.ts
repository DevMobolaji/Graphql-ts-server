import { User } from "./entity/User";
import {
    resolverMap
} from "./types/graphql-utils";
import * as bcryptjs from "bcryptjs"

export const resolvers: resolverMap = {
    Query: {
        hello: (_,  { name }: GQL.IHelloOnQueryArguments) => `Hello from ${name} || world`
    },
    Mutation: {
        register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
            const hashedPass = await bcryptjs.hash(password, 10)
            console.log(hashedPass)
            const user = await User.create({
                email,
                password: hashedPass
            })
            await user.save()
            return true
        }
        }
    };