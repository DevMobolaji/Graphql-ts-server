// import Redis from "ioredis";
// //import sanitizedConfig from "../config"
// import { User } from "../entity/User"
// import { createConfirmEmailLinkUrl } from "./createConfirmEmailLink"
// import { createTypeormConn } from "./createTypeormConn"

// const redis = new Redis();


// let userId: string;

// beforeAll(async () => {
//     await createTypeormConn()
//     const user = await User.create({
//         email: "dycjh@example.com",
//         password: "123456"
//     }).save()
//     userId = user.id
// })


// test("make sure confirm email works", async () => {
//     const url = await createConfirmEmailLinkUrl("http://localhost:4000/graphql", userId, redis);

//     const response = await fetch(url)
//     const text = await response.text()
//     console.log(text)
// })
function sum(a: number, b: number) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});