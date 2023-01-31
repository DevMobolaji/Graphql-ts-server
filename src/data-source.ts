import "reflect-metadata"
import sanitizedConfig from "./config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Makanaki_12345",
    database: "graphql-ts-server",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});


export const TestDevSource = new DataSource({
    // type: "mongodb",
    // url: sanitizedConfig.MONGO_URI,
    // useNewUrlParser: true,
    // port: 27017,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: sanitizedConfig.dbPass,
    database: "graphql-ts-server-test",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});