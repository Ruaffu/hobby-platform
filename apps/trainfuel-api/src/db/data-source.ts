import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { FoodEntity } from "../modules/foods/entities/food.entity.js"
import { DailyGoalEntity } from "../modules/goals/entities/daily-goal.entity"
import { MealEntryEntity } from "../modules/meals/entities/meal-entry.entity"
import { WeightEntryEntity } from "../modules/weight/entities/weight-entry.entity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USER ?? "trainfuel",
  password: process.env.DATABASE_PASSWORD ?? "trainfuel",
  database: process.env.DATABASE_NAME ?? "trainfuel",
  entities: [FoodEntity, MealEntryEntity, DailyGoalEntity, WeightEntryEntity],
  synchronize: false,
  logging: true
})
