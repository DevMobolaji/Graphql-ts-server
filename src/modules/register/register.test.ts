import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from './errorMessages';
import sanitizedConfig from '../../config';
import { createTypeormConn } from '../../utils/createTypeormConn';
import { User } from '../../entity/User';
import { testClient } from '../../utils/testClients';
//import { redis } from '../../redis';

//import { AddressInfo } from "net";
//import { startServer } from '../../startServer';

beforeAll(async () => {
  await createTypeormConn ()
});
                                                                                                                                                       
// afterAll(async () => {
//   await createTypeormDisConn();
//   await redis.flushdb()
//   await redis.quit();
// })


const email = "ala083780@mail.com";
const password = "dgfjkjkkl";


describe('Register User', () => {
  it('"make sure to register a user"', async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)
    
    const response = await client.register(email, password)
    expect(response.data).toEqual({ register: null })

    const users = await User.find({ where: { email } })
    expect(users).toHaveLength(1);
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)
  })

  test("check for duplicate emails", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)

    const response2 = await client.register(email, password)
    expect(response2.data.register).toHaveLength(1)
    expect(response2.data.register[0]).toEqual({
      path: "email",
      message: duplicateEmail
    })
  })

  test("catch bad email", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)

    const response3 = await client.register("hakahasdio", password)
    expect(response3.data.register).toHaveLength(2)
    expect(response3.data).toEqual({
      register: [
        {
          path: "email",
          message: invalidEmail
        },
        {
          path: "email",
          message: emailNotLongEnough
        },
      ]
  });

  })

  test("catch bad password", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)

    const response4 = await client.register(email, "ad")
    expect(response4.data.register).toHaveLength(1)
    expect(response4.data).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  })

  test("catch bad email and bad password", async () => {
    const client = new testClient(sanitizedConfig.TEST_HOST)
    
    const response5 = await client.register("ad", "bj")
    expect(response5.data.register).toHaveLength(3)
    expect(response5.data).toEqual({
      register: [
      {
          path: "email",
          message: invalidEmail
        },
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  })
});

//use a test database ==> done
//drop all data once test is over ==> done
//when i run npmn test it also start the server