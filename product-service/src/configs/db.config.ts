import { DataSource } from "typeorm"
import variables from "./constants.config"
import { ProductEntity } from "@/Entities/product.entity"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: variables.DB_USER,
    password: variables.DB_PASSWORD,
    database: variables.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [ProductEntity],
    subscribers: [],
    migrations: [],
})