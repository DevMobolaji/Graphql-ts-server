import * as bcryptjs from "bcryptjs"
import { resolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { confirmEmailError, forgotPasswordLockedError, invalidLogin } from "./errorMessages";
import { userSessionIdPrefix } from "../../constants";

const InvalidLogin = [
    {
        path: "email",
        message: invalidLogin
    }
]

const ConfirmEmailError = [
    {
        path: "email",
        message: confirmEmailError
    }
];

const ForgotPasswordLockError = [
    {
        path: "password",
        message: forgotPasswordLockedError
    }
];

export const resolvers: resolverMap = {
    Mutation: {
        login: async (_, args, { session, redis, req }) => {
            const { email, password } = args;
            const user = await User.findOne({ where: { email } })
            console.log(user)


            if (!user) {
                return InvalidLogin
            }


            if (!user.confirmed) {
                return ConfirmEmailError
            }


            if (user.forgotPasswordLocked) {
                return ForgotPasswordLockError
            }

            const validPass = await bcryptjs.compare(password, (user.password as any))

            if (!validPass) {
                return InvalidLogin
            }

            //login successful
            session.userId = user.id
            session.userType = user.userType

            if (req.sessionID) {
                await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID)
            }

            return null;
        }
    }
} 