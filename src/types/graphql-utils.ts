import { Redis } from "ioredis";

export interface resolverMap {
    [key: string]: {
        [key: string]: (parent: any, args: any, context: {redis: Redis, url: string, req: object}, info: any) => any;
    }
}