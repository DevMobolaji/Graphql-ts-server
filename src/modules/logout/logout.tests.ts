import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import sanitizedConfig from "../../config";
import { testClient } from "../../utils/testClients";

const email = "malikbn@gmail.com"
const password = "bob123456"
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

describe("logout", () => {
    test("logout multiple session", async () => {
        //computer one 1
        const sess1 = new testClient(sanitizedConfig.TEST_HOST)
        // computer 2
        const sess2 = new testClient(sanitizedConfig.TEST_HOST)

        await sess1.login(email, password)

        await sess2.login(email, password)
        expect(await sess1.me()).toEqual(await sess2.me())

        await sess1.logout()
        expect(await sess1.me()).toEqual(await sess2.me())
    })

    test("logout single session", async () => {
        const client = new testClient(sanitizedConfig.TEST_HOST)

        await client.login(email, password)

        const response = await client.me()

        expect(response.data).toEqual({
            me: {
                id: userId,
                email
            }
        })


        await client.logout()

        const response2 = await client.me()

        expect(response2.data.me).toBeNull()
    })
})

