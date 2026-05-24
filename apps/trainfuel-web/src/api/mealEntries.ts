import {
  type CreateMealEntry,
  CreateMealEntrySchema,
  type MealEntry,
  MealEntrySchema
} from "@hobby/contracts"
import { apiRequest } from "./apiClient"

export const getMealEntries = async (): Promise<MealEntry[]> => {
  const data = await apiRequest<unknown>("/meal-entries")
  return MealEntrySchema.array().parse(data)
}

export const createMealEntry = async (input: CreateMealEntry): Promise<MealEntry> => {
  const body = CreateMealEntrySchema.parse(input)

  const data = await apiRequest<unknown>("/meal-entries", {
    method: "POST",
    body
  })

  return MealEntrySchema.parse(data)
}

export const deleteMealEntry = async (id: string): Promise<MealEntry> => {
  const data = await apiRequest<unknown>(`/meal-entries/${id}`, {
    method: "DELETE"
  })

  return MealEntrySchema.parse(data)
}
