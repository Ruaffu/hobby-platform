import { type CreateFood, CreateFoodSchema, type Food, FoodSchema } from "@hobby/contracts"
import { env } from "../config/env"

export const getFoods = async (): Promise<Food[]> => {
  const response = await fetch(`${env.apiBaseUrl}/foods`)

  if (!response.ok) {
    throw new Error("Failed to fetch foods")
  }

  const data = await response.json()

  return FoodSchema.array().parse(data)
}

export const createFood = async (input: CreateFood): Promise<Food> => {
  const body = CreateFoodSchema.parse(input)

  const response = await fetch(`${env.apiBaseUrl}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error("Failed to create food")
  }

  const data = await response.json()

  return FoodSchema.parse(data)
}

export const deleteFood = async (id: string): Promise<Food> => {
  const response = await fetch(`${env.apiBaseUrl}/foods/${id}`, {
    method: "DELETE"
  })

  if (!response.ok) {
    throw new Error("Failed to delete")
  }

  const data = await response.json()

  return FoodSchema.parse(data)
}
