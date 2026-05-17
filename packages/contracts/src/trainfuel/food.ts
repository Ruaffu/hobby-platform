import { z } from "zod"

// FoodSchema describes what a food looks like after it exists.
// It includes the generated id.
export const FoodSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Food name is required"),
  calories: z
    .number()
    .int("Calories must be a whole number")
    .nonnegative("Calories cannot be negative"),
  protein: z.number().nonnegative("Protein cannot be negative"),
  carbs: z.number().nonnegative("Carbs cannot be negative"),
  fat: z.number().nonnegative("Fat cannot be negative")
})

// FoodListSchema is used for endpoints that return multiple foods.
export const FoodListSchema = z.array(FoodSchema)

// CreateFoodSchema describes what the client sends when creating food.
// It does not include id because the database generates it.
export const CreateFoodSchema = FoodSchema.omit({ id: true })

export type Food = z.infer<typeof FoodSchema>
export type CreateFood = z.infer<typeof CreateFoodSchema>
