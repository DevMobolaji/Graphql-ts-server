//import sanitizedConfig from "../config"
import { User } from "../entity/User"
import { createConfirmEmailLinkUrl } from "./createConfirmEmailLink";
import { createTypeormConn, createTypeormDisConn } from "./createTypeormConn";
import sanitizedConfig from "../config";
//import axios from "axios";
import { redis } from "../redis"
import request, { gql } from "graphql-request";
// jest.useFakeTimers()

let userId: string;

beforeAll(async () => {
    await createTypeormConn()
    const user = await User.create({
        email: "malikbn@gmail.com",
        password: "bob123456"
    }).save()
    userId = user.id
})

afterAll(async () => {
    await createTypeormDisConn()
    await redis.flushdb()
    await redis.quit();
})

const mutation = (id: string) => gql`
  mutation {
    confirmEmail(id: "${id}")
  }`;



test("make sure confirm email works", async () => {
    const res = await createConfirmEmailLinkUrl(sanitizedConfig.TEST_HOST, userId, redis);
    const chunk = res.split("/")
    const id = chunk[chunk.length -1]
    const response = await request(sanitizedConfig.TEST_HOST as string, mutation(id))
    expect(response).toEqual({ confirmEmail: true })

    expect(response.status).toBe(200);
    const user = await User.findOne({ where: { id: userId }})
    expect((user as User).confirmed).toBeTruthy()
    // const chunk = url.split("/")
    // //const key = chunk[chunk.length -1]
    // const key = chunk[4]; 
    const value = await redis.get(id)
    expect(value).toBeNull()
})

