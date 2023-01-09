
import { request, gql } from 'graphql-request'
import { host } from "../../test/constants";
import { TestDevSource } from "../../data-source";
import { User } from '../../entity/User';
import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough } from './errorMessages';

const email = "bob@bob42.com";
const password = "dgfjkjkkl";

beforeAll(async () => {
  await TestDevSource.initialize()
});

afterAll(async () => {
  await TestDevSource.destroy()
});

const mutation = (e: string, p: string) => gql`
  mutation {
    register(email: "${e}", password: "${p}") {
      path
      message
    }
  }`;

test('Register User', async () => {
  //make sure to register a user
  const response = await request(host, mutation(email, password))
  expect(response).toEqual({ register: null })

  const users = await User.find({ where: { email } }) 
  expect(users).toHaveLength(1);
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)


  //check for duplicate emails
  const response2: any  = await request(host, mutation(email, password))
  expect(response2.register).toHaveLength(1)
  expect(response2.register[0]).toEqual({
    path: "email",
    message: duplicateEmail
  })

  //catch bad email
  const response3 = await request(host, mutation("b", password))
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

  //catch bad password
  const response4 = await request(host, mutation(email, "ad"))
  expect(response4.register).toHaveLength(1)
  expect(response4).toEqual({
    register: [
      {
        path: "password",
        message: passwordNotLongEnough
      }
    ]
  });

  //catch bad email and bad password
  const response5 = await request(host, mutation("bj", "ad"))
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

});

//use a test database
//drop all data once test is over
//when i run npmn test it also start the server