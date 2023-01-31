import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import sanitizedConfig from "../../config";
import { testClient } from "../../utils/testClients";

let userId: string;
const email = "malikbn@gmail.com"
const password = "bob123456"


beforeAll(async () => {
    await createTypeormConn()
    const user = await User.create({
        email,
        password,
        confirmed: true
    }).save()
    userId = user.id
})



describe("me", () => {
    test("return null if no cookie", async () => {
        const client = new testClient(sanitizedConfig.TEST_HOST)
        
        const response = await client.me()

        expect(response.data.me).toBeNull()
    })

    test("get current user", async () => {
        const client = new testClient(sanitizedConfig.TEST_HOST)
        await client.login(email, password)

        const response2 = await client.me()

        expect(response2.data).toEqual({
            me: {
                id: userId,
                email
            }
        })
    });
});

