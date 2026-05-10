import { CreateFoodSchema } from "@hobby/contracts"
import express from "express"
import { AppDataSource } from "./db/data-source"
import { FoodEntity } from "./modules/foods/entities/food.entity"

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "trainfuel-api"
  })
})

app.get("/foods", async (_, res) => {
  const foodRepository = AppDataSource.getRepository(FoodEntity)

  const foods = await foodRepository.find({
    order: {
      createdAt: "DESC"
    }
  })

  res.json(
    foods.map((food) => ({
      id: food.id,
      name: food.name,
      calories: food.calories,
      protein: Number(food.protein),
      carbs: Number(food.carbs),
      fat: Number(food.fat)
    }))
  )
})

app.post("/foods", async (req, res) => {
  const result = CreateFoodSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid food",
      issues: result.error.issues
    })
  }

  const foodRepository = AppDataSource.getRepository(FoodEntity)

  const food = foodRepository.create({
    name: result.data.name,
    calories: result.data.calories,
    protein: String(result.data.protein),
    carbs: String(result.data.carbs),
    fat: String(result.data.fat)
  })

  const savedFood = await foodRepository.save(food)

  return res.status(201).json({
    id: savedFood.id,
    name: savedFood.name,
    calories: savedFood.calories,
    protein: Number(savedFood.protein),
    carbs: Number(savedFood.carbs),
    fat: Number(savedFood.fat)
  })
})

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
