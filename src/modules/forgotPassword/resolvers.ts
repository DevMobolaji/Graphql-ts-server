import { forgotPasswordPrefix } from "../../constants";
import { User } from "../../entity/User";
import { resolverMap } from "../../types/graphql-utils";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { formatYupError } from "../../utils/formatYupError";
import { registerPasswordValidation } from "../../yupSchema";
import { createForgotPasswordLink } from "./createForgotPasswordLink";
import { expiredKeyError, userNotFoundError } from "./errorMessages";
import * as yup from "yup"
import * as bcryptjs from "bcryptjs"
import { MutationForgotPasswordChangeArgs, MutationSendForgotPasswordEmailArgs } from "../../generated-types/graphql";
import { sendEmail } from "../../utils/sendEmail";



//lock their account after reaching out to this resolver
//20 minutes
const schema = yup.object().shape({
    newPassword: registerPasswordValidation
})


export const resolvers: resolverMap = {
    Mutation: {
        sendForgotPasswordEmail: async (_, args: MutationSendForgotPasswordEmailArgs, { redis, url }) => {
            const { email } = args;
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return [
                    {
                        path: "email",
                        message: userNotFoundError
                    }
                ]
            }

            await forgotPasswordLockAccount(user.id, redis)
            //@todo add frontend url

            const link = await createForgotPasswordLink(url, user.id, redis)
            //@todo send email with url
            await sendEmail(email, link)

            return true
        },
        forgotPasswordChange: async (_, args: MutationForgotPasswordChangeArgs, { redis }) => {
            const { newPassword, key } = args;
            const redisKey = `${forgotPasswordPrefix}${key}`

            const userId = await redis.get(redisKey)
            if (!userId) {
                return [
                    {
                        path: "key",
                        message: expiredKeyError
                    }
                ];
            };

            try {
                await schema.validate({ newPassword }, { abortEarly: false })
            } catch (error) {
                return formatYupError(error)
            }

            const hashedPass = await bcryptjs.hash(newPassword, 10)

            const updatePromise = await User.update({ id: userId }, {
                forgotPasswordLocked: false,
                password: hashedPass
            })

            const deleteKeyPromise = await redis.del(redisKey)
            await Promise.all([deleteKeyPromise, updatePromise]);

            return null
        }
    }
}
