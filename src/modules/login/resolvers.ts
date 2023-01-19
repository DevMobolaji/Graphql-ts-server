import * as bcryptjs from "bcryptjs"
import * as yup from "yup"
import { formatYupError } from "../../utils/formatYupError";
import { resolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { invalidEmail } from "../register/errorMessages";
import { confirmEmailError, invalidLogin } from "./errorMessages";

const schema = yup.object().shape({
    email: yup.string()
        .email(invalidEmail)
        .required(),
    password: yup.string()
    .required()
})

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

export const resolver: resolverMap = { 
    Mutation: {
        login: async (_, args) => {
            try {
                await schema.validate(args, { abortEarly: true})
            } catch (error) {
                formatYupError(error)
            }
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