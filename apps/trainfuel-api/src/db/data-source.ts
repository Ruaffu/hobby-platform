import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { FoodEntity } from "../modules/foods/entities/food.entity.js"


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USER ?? "trainfuel",
  password: process.env.DATABASE_PASSWORD ?? "trainfuel",
  database: process.env.DATABASE_NAME ?? "trainfuel",
  entities: [FoodEntity],
  synchronize: false,
  logging: true
})