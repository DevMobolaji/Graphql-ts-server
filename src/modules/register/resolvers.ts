import { User } from "../../entity/User";
import {
    resolverMap
} from "../../types/graphql-utils";
import * as bcryptjs from "bcryptjs"
import * as yup from "yup"
import { formatYupError } from "../../utils/formatYupError";
import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from "./errorMessages";

const schema = yup.object().shape({
    email: yup.string()
        .email(invalidEmail)
        .required()
        .min(3, emailNotLongEnough)
        .max(255),
    password: yup.string()
        .required()
        .min(3, passwordNotLongEnough)
        .max(255)
})

export const resolvers: resolverMap = {
    Mutation: {
        register: async (_, args: GQL.IRegisterOnMutationArguments) => {
            try {
                await schema.validate(args, { abortEarly: false })
            } catch (error) {
                return formatYupError(error)
            }
            const { email, password } = args;
            const userAlredyExists = await User.findOne({ where: { email }, select: ["id"] })
            if (userAlredyExists) {
                return [{
                    path: "email",
                    message: duplicateEmail
                }]
            }
            const hashedPass = await bcryptjs.hash(password, 10)
            const user = User.create({
                email,
                password: hashedPass
            })
            await user.save()
            return null
        }
        }
    };