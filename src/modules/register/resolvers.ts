import * as yup from "yup"
import { invalidEmail, emailNotLongEnough, duplicateEmail } from "./errorMessages";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../../entity/User";
import { resolverMap } from "../../types/graphql-utils";
import { createConfirmEmailLinkUrl } from "../../utils/createConfirmEmailLink";
import { formatYupError } from "../../utils/formatYupError";
import { registerPasswordValidation } from "../../yupSchema";


const schema = yup.object().shape({
    email: yup.string()
        .email(invalidEmail)
        .required()
        .min(3, emailNotLongEnough)
        .max(255),
    password: registerPasswordValidation
})

export const resolvers: resolverMap = {
    Mutation: {
        register: async (_, args, { redis, url }) => {
            try {
                await schema.validate(args, { abortEarly: false })
            } catch (error) {
                return formatYupError(error)
            }
            const { email, password } = args;
            const userAlredyExists = await User.findOne({ where: { email } })

            if (userAlredyExists) {
                return [
                    {
                        path: "email",
                        message: duplicateEmail
                    }
                ]
            }
            //const user = new User()
            const user = User.create({
                email,
                password,
            })

            await user.save()

            const link = await createConfirmEmailLinkUrl(url, user.id, redis)
            await sendEmail(email, link)
            // const url1 = link.toString().split("/")[4]; 
            // console.log(url1)
            return null
        },
        confirmEmail: async (_, args, { redis }) => {
            try {
                const { id } = args;
                const userId = await redis.get(id as any)
                console.log(userId)

                if (!userId) {
                    //throw new Error("User not found")
                    return false
                }
                await User.update({ id: userId }, { confirmed: true });
                await redis.del(id as any)
                console.log("it worked")
                return true
            } catch (error) {
                return formatYupError(error)
            }
        },
    }
};