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
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});
