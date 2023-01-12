import sanitizedConfig from "../../config"
import { AppDataSource, TestDevSource } from "../data-source"

export const createTypeormConn = async () => {
    if (sanitizedConfig.NODE_ENV === "Test") {
        await TestDevSource.initialize()
    } else {
        await AppDataSource.initialize()
    }
}