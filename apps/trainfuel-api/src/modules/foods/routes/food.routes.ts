import { CreateFoodSchema } from "@hobby/contracts"
import { Router } from "express"
import { foodService } from "../services/food.service"

export const foodRoutes = Router()

foodRoutes.get("/", async (_req, res) => {
  const foods = await foodService.listFoods()

  return res.json(foods)
})

foodRoutes.post("/", async (req, res) => {
  const result = CreateFoodSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid food",
      issues: result.error.issues
    })
  }

  const food = await foodService.createFood(result.data)

  return res.status(201).json(food)
})
