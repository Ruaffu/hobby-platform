import { z } from "zod"
import { FoodSchema } from "../food"

export const MealTypeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"])

export const MealEntrySchema = z.object({
  id: z.uuid(),
  food: FoodSchema,
  mealType: MealTypeSchema,
  quantityGrams: z.number().positive("Quantity must be greater than zero"),
  loggedAt: z.iso.datetime()
})

export const MealEntryListSchema = z.array(MealEntrySchema)

export const CreateMealEntrySchema = z.object({
  foodId: z.uuid(),
  mealType: MealTypeSchema,
  quantityGrams: z.number().positive("Quantity must be greater than zero"),
  loggedAt: z.iso.datetime().optional()
})

export type MealType = z.infer<typeof MealTypeSchema>
export type MealEntry = z.infer<typeof MealEntrySchema>
export type CreateMealEntry = z.infer<typeof CreateMealEntrySchema>
