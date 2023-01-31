import { Redis } from "ioredis";
import { removeAllUserSessions } from "./removeAllUserSessions";
import { User } from "../entity/User";

export const forgotPasswordLockAccount = async (userId: string, redis: Redis) => {
    //can't login
    await User.update({ id: userId}, { forgotPasswordLocked: true })
    //remove all sessions
    await removeAllUserSessions(userId, redis)
}