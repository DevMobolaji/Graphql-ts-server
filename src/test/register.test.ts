
import { request } from 'graphql-request'
import { host } from "./constants";
import { AppDataSource } from "../data-source";
import { User } from '../entity/User';

const email = "bob@bob2.com";
const password = "bobsdfghgh";

const mutation = `
  mutation {
    register(email: "${email}", password: "${password}")
  }`;

test('Register User', async () => {
  const response = await request(host, mutation)
  expect(response).toEqual({ register: true })

  await AppDataSource.initialize();

  const users = await User.find({ where: { email } }) 
  expect(users).toHaveLength(1);
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)
});

//use a test database
//drop all data once test is over
//when i run npmn test it also start the server