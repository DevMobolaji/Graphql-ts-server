import { Request } from 'express';
import { Session, SessionData } from 'express-session';

import { Redis } from "ioredis";

export interface ISession extends Session, SessionData {
    userId?: string,
    userType?: string
}

export interface Context {
    redis: Redis, req: Request, url: string, session: ISession
}

export type Resolver = (
    parent: any, args: any, context: Context, info: any
) => any;

export type GraphQLmiddlewareFunc = (
    resolver: Resolver, parent: any, args: any, context: Context, info: any
) => any;

export interface resolverMap {
    [key: string]: {
        [key: string]: Resolver
    }
}