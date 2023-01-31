import sanitizedConfig from '../../config';
import { confirmEmailError, invalidLogin } from './errorMessages';
import { User } from '../../entity/User';
import { createTypeormConn, createTypeormDisConn } from '../../utils/createTypeormConn';
import { testClient } from '../../utils/testClients';

const email = "alan080378962480@gmail.com";
const password = "dgfjkjkkl";

beforeAll(async () => {
    await createTypeormConn()
});
                                                                                                                                                       
afterAll(async () => {
    await createTypeormDisConn();
})


const loginExpectError = async (client: testClient, e: string, p: string, errMsg: string) => {
  const response = await client.login(e, p)

        expect(response).toEqual({
            login: [{
                path: "email",
                message: errMsg
            }]
        })
}

describe("login", () => {
  test("email not found in database", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)
    await loginExpectError(client, "bob@dbob.com", "bob12345", invalidLogin)
  })
  
  test("Email not confirmed", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST) 

    await client.register(email, password)

    await loginExpectError(client, email, password, confirmEmailError)
      
    await User.update({ confirmed: true }, { email })
    
    await loginExpectError(client, email, "sedfsdfjofd", invalidLogin)

      
    const response = await client.login(email, password)
      
    expect(response).toEqual({ login: null });
  })
}) 