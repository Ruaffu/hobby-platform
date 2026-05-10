import { CreateFoodSchema } from "@hobby/contracts"
import { Router } from "express"
import { foodService } from "../services/food.service"

// Deprecated: this Express router is no longer mounted in the API.
//
// Foods are now exposed through oRPC procedures instead.
// Keeping this file temporarily as a reference while the OpenAPI flow is being implemented.
//
// Safe to delete once:
// - oRPC handles all food endpoints
// - OpenAPI generation works
// - the frontend uses the oRPC/OpenAPI-backed API path
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
