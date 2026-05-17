import {
  type CreateFood,
  CreateFoodSchema,
  type Food,
  FoodSchema,
  type UpdateFood,
  UpdateFoodSchema
} from "@hobby/contracts"
import { apiRequest } from "./apiClient"

export const getFoods = async (): Promise<Food[]> => {
  const data = await apiRequest<unknown>("/foods")

  return FoodSchema.array().parse(data)
}

export const createFood = async (input: CreateFood): Promise<Food> => {
  const body = CreateFoodSchema.parse(input)

  const data = await apiRequest<unknown>("/foods", {
    method: "POST",
    body
  })

  return FoodSchema.parse(data)
}

export const deleteFood = async (id: string): Promise<Food> => {
  const data = await apiRequest<unknown>(`/foods/${id}`, {
    method: "DELETE"
  })

  return FoodSchema.parse(data)
}

export const updateFood = async (input: UpdateFood): Promise<Food> => {
  const body = UpdateFoodSchema.parse(input)

  const data = await apiRequest<unknown>(`/foods/${body.id}`, {
    method: "PATCH",
    body
  })

  return FoodSchema.parse(data)
}
