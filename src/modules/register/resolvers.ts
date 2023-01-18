import * as bcryptjs from "bcryptjs"
import * as yup from "yup"
import { formatYupError } from "../../utils/formatYupError";
import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from "../../modules/register/errorMessages";
import { resolverMap } from "../../types/graphql-utils";
import { createConfirmEmailLinkUrl } from "../../utils/createConfirmEmailLink";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../../entity/User";
import { MutationConfirmEmailArgs, MutationRegisterArgs } from "../../generated-types/graphql";

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
        register: async (_, args: MutationRegisterArgs, { redis, url }) => {
            try {
                await schema.validate(args, { abortEarly: false })
            } catch (error) {
                return formatYupError(error)
            }
            const { email, password } = args;
            const userAlredyExists = await User.findOne({ where: { email }, select: ["id"] })

            if (userAlredyExists) {
                return [
                    {
                        path: "email",
                        message: duplicateEmail
                    }
                ]
            }
            const hashedPass = await bcryptjs.hash(password, 10)
            const user = User.create({
                email,
                password: hashedPass
            })
            await user.save()
            
            const link = await createConfirmEmailLinkUrl(url, user.id, redis)
            await sendEmail(email, link)
            // const url1 = link.toString().split("/")[4]; 
            // console.log(url1)
            return null
        },
        confirmEmail: async (_, args: MutationConfirmEmailArgs, { redis }) => {
            try {
                const { id } = args;
                const userId = await redis.get(id as any)

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