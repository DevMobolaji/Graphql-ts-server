import Redis from "ioredis";
import { v4 } from "uuid"
import { forgotPasswordPrefix } from "../../constants";

export const createForgotPasswordLink = async (url: string, userId: string, redis: Redis) => {
    const id = v4();

    await redis.set(`${forgotPasswordPrefix}${id}`, userId, "EX", 60 * 20) //20 minutes
    return `${url}/change-password/${id}`
} 