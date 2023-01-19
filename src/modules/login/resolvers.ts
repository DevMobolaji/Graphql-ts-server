import * as bcryptjs from "bcryptjs"
import { resolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { confirmEmailError, invalidLogin } from "./errorMessages";
const InvalidLogin = [
    {
        path: "email",
        message: invalidLogin
    }
]

const ConfirmEmailError = [
    {
        path: "emali",
        message: confirmEmailError
    }
];

export const resolvers: resolverMap = { 
    Mutation: {
        login: async (_, args) => {
            const { email, password } = args;
            const user = await User.findOne({ where: { email } })       
            if (!user) {
                return InvalidLogin
            }

            if (!user.confirmed) {
                return ConfirmEmailError
            }

            const validPass = await bcryptjs.compare(password, user.password)
            
            if (!validPass) {
                return InvalidLogin
            }
            return null;
        }
    }
} 