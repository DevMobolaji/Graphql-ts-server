import Redis from "ioredis";
import { v4 } from "uuid"

export const createConfirmEmailLinkUrl = async (url: string, userId: string, redis: Redis) => {
    const ids = v4();

    await redis.set(ids, userId, "EX", 60 * 60 * 24)
    return `${url}/confirm/${ids}`
} 