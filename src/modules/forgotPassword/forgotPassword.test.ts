import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import sanitizedConfig from "../../config";
import { testClient } from "../../utils/testClients";
import { redis } from "../../redis";
import { createForgotPasswordLink } from "./createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { forgotPasswordLockedError } from "../login/errorMessages";
import { passwordNotLongEnough } from "../register/errorMessages";
import { expiredKeyError } from "./errorMessages";

const email = "malikbn@gmail.com"
const password = "bob123456"
const newPassword = "dfhduidhksdhfdis";

let userId: string;

beforeAll(async () => {
    await createTypeormConn()
    const user = await User.create({
        email,
        password,
        confirmed: true
    }).save()
    userId = user.id
})

describe("forgot password", () => {
    test("make sure the user forgot his password", async () => {
        const client = new testClient(sanitizedConfig.TEST_HOST)

        //lock account
        await forgotPasswordLockAccount(userId, redis)

        const url = await createForgotPasswordLink("", userId, redis)
        const part = url.split("/")

        const key = part[part.length - 1];

        //make sure user cant login to the account
        expect(await client.login(email, password)).toEqual({
            data: {
                login: [{
                    path: "email",
                    message: forgotPasswordLockedError
                }]
            }
        }) 

        //try changing to password thats too short
        expect(await client.forgotPasswordChange("a", key)).toEqual({
            data: {
                forgotPasswordChange: [{
                    path: "newPassword",
                    message: passwordNotLongEnough
                }]
            }
        })

        const response = await client.forgotPasswordChange(newPassword, key)
        expect(response.data).toEqual({
            forgotpasswordChange: null
        })

        //make sure redis key expires after password change
        expect(await client.forgotPasswordChange("drtfguyuj", key)).toEqual({
            data: {
                forgotPasswordChange: [{
                    path: "key",
                    message: expiredKeyError
                }]
            }
        })

        expect(await client.login(email, newPassword)).toEqual({
            data: {
                login: null
            }
        });

        expect(await client.me()).toEqual({
            data: {
                me: {
                    email,
                    id: userId
                }
            }
        })
    })
})
