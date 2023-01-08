import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Makanaki_12345",
    database: "graphql-ts-server",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});


export const TestDevSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Makanaki_12345",
    database: "graphql-ts-server-test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});