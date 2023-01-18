//import sanitizedConfig from "../config"
import { User } from "../entity/User"
import { createConfirmEmailLinkUrl } from "./createConfirmEmailLink";
//import fetch = require("node-fetch")
import { createTypeormConn, createTypeormDisConn } from "./createTypeormConn";
import sanitizedConfig from "../config";
//import axios from "axios";
import { redis } from "../redis"
import { fetch } from "@whatwg-node/fetch";

let userId: string;

beforeAll(async () => {
    await createTypeormConn()
    const user = await User.create({
        email: "test19@test.com",
        password: "123456"
    }).save()
    userId = user.id
})
                                                                                                                                                       
afterAll(async () => {
    await createTypeormDisConn()
    // await redis.flushdb()
    // await redis.quit();
})



test("make sure confirm email works", async () => {
    const url = await createConfirmEmailLinkUrl(sanitizedConfig.TEST_HOST, userId, redis);

    const res = await fetch(url);
    console.log(res)
    expect(res.status).toBe(200);
    const user = await User.findOne({ where: { id: userId }})
    expect((user as User).confirmed).toBeTruthy()
    const chunk = url.split("/")
    //const key = chunk[chunk.length -1]
    const key = chunk[4]; 
    const value = await redis.get(key)
    expect(value).toBeNull()
    expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
})

