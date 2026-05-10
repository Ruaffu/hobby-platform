import { type Food, FoodSchema } from "@hobby/contracts"
import { env } from "../config/env"

export const getFoods = async (): Promise<Food[]> => {
  const response = await fetch(`${env.apiBaseUrl}/foods`)

  if (!response.ok) {
    throw new Error("Failed to fetch foods")
  }

  const data = await response.json()

  return FoodSchema.array().parse(data)
}
