
import { request, gql } from 'graphql-request'
import { User } from '../../entity/User';
import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from './errorMessages';
import { destroyDb } from '../../utils/createTypeormConn';
import { startServer } from '../../startServer';
import { AddressInfo } from 'net';

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer()
  const { port } = app.address() as AddressInfo;

  getHost = () => `http://localhost:${port}/graphql`;
});
                                                                                                                                                       
afterAll(async() => {
  await destroyDb()
})

const email = "bob@8l.com";
const password = "dgfjkjkkl";

const mutation = (e: string, p: string) => gql`
  mutation {
    register(email: "${e}", password: "${p}") {
      path
      message
    }
  }`;

describe('Register User', () => {
  it('"make sure to register a user"', async () => {
    const response = await request(getHost(), mutation(email, password))
    expect(response).toEqual({ register: null })

    const users = await User.find({ where: { email } })
    expect(users).toHaveLength(1);
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)
  })

  test("check for duplicate emails", async () => {
    const response2: any  = await request(getHost(), mutation(email, password))
    expect(response2.register).toHaveLength(1)
    expect(response2.register[0]).toEqual({
      path: "email",
      message: duplicateEmail
    })
  })

  test("catch bad email", async () => {
    const response3 = await request(getHost(), mutation("b", password))
    expect(response3.register).toHaveLength(2)
    expect(response3).toEqual({
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
    const response4 = await request(getHost(), mutation(email, "ad"))
    expect(response4.register).toHaveLength(1)
    expect(response4).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  })

  test("catch bad email and bad password", async () => {
    const response5 = await request(getHost(), mutation("bj", "ad"))
    expect(response5.register).toHaveLength(3)
    expect(response5).toEqual({
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

//use a test database
//drop all data once test is over
//when i run npmn test it also start the server