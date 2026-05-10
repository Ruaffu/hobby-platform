import express from "express"
import { AppDataSource } from "./db/data-source"
import { foodRoutes } from "./modules/foods/routes/food.routes"

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "trainfuel-api"
  })
})

app.use("/foods", foodRoutes)

const start = async () => {
  await AppDataSource.initialize()

  app.listen(4000, () => {
    console.log("TrainFuel API running on http://localhost:4000")
  })
}

start().catch((error) => {
  console.error("Failed to start API", error)
  process.exit(1)
})
