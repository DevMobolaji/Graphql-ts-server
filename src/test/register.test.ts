
import { request, gql } from 'graphql-request'
import { host } from "./constants";
import { TestDevSource } from "../data-source";
import { User } from '../entity/User';

const email = "bob@bob42.com";
const password = "bobsdfghgh";

beforeAll(async () => {
  await TestDevSource.initialize()
});

afterAll(async () => {
  await TestDevSource.destroy()
});

const mutation = gql`
  mutation {
    register(email: "${email}", password: "${password}")
  }`;

test('Register User', async () => {
  const response = await request(host, mutation)
  expect(response).toEqual({ register: true })

  const users = await User.find({ where: { email } }) 
  expect(users).toHaveLength(1);
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)
});

//use a test database
//drop all data once test is over
//when i run npmn test it also start the server