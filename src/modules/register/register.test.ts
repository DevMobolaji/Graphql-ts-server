import { request, gql } from 'graphql-request'
//import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from './errorMessages';
import sanitizedConfig from '../../config';
import { createTypeormConn, createTypeormDisConn } from '../../utils/createTypeormConn';
import { User } from '../../entity/User';

beforeAll(async () => {
    await createTypeormConn()
});
                                                                                                                                                       
afterAll(async () => {
    await createTypeormDisConn();
})


const email = "b@b.com";
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
    const response = await request(sanitizedConfig.TEST_HOST as string, mutation(email, password))
    console.log(response)
    expect(response).toEqual({ register: null })

    const users = await User.find({ where: { email } })
    expect(users).toHaveLength(1);
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)
  })

  // test("check for duplicate emails", async () => {
  //   const response2: any  = await request(sanitizedConfig.TEST_HOST as string, mutation(email, password))
  //   expect(response2.register).toHaveLength(1)
  //   expect(response2.register[0]).toEqual({
  //     path: "email",
  //     message: duplicateEmail
  //   })
  // })

  // test("catch bad email", async () => {
  //   const response3 = await request(sanitizedConfig.TEST_HOST as string, mutation("b", password))
  //   expect(response3.register).toHaveLength(2)
  //   expect(response3).toEqual({
  //     register: [
  //       {
  //         path: "email",
  //         message: invalidEmail
  //       },
  //       {
  //         path: "email",
  //         message: emailNotLongEnough
  //       },
  //     ]
  // });

  // })

  // test("catch bad password", async () => {
  //   const response4 = await request(sanitizedConfig.TEST_HOST as string, mutation(email, "ad"))
  //   expect(response4.register).toHaveLength(1)
  //   expect(response4).toEqual({
  //     register: [
  //       {
  //         path: "password",
  //         message: passwordNotLongEnough
  //       }
  //     ]
  //   });
  // })

  // test("catch bad email and bad password", async () => {
  //   const response5 = await request(sanitizedConfig.TEST_HOST as string, mutation("bj", "ad"))
  //   expect(response5.register).toHaveLength(3)
  //   expect(response5).toEqual({
  //     register: [
  //     {
  //         path: "email",
  //         message: invalidEmail
  //       },
  //       {
  //         path: "email",
  //         message: emailNotLongEnough
  //       },
  //       {
  //         path: "password",
  //         message: passwordNotLongEnough
  //       }
  //     ]
  //   });
  // })
});

//use a test database ==> done
//drop all data once test is over ==> done
//when i run npmn test it also start the server