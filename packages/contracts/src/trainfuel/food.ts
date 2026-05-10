import { z } from "zod"

// FoodSchema describes what a food looks like after it exists.
// It includes the generated id.
export const FoodSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  calories: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  fat: z.number().nonnegative()
})

// FoodListSchema is used for endpoints that return multiple foods.
export const FoodListSchema = z.array(FoodSchema)

// CreateFoodSchema describes what the client sends when creating food.
// It does not include id because the database generates it.
export const CreateFoodSchema = FoodSchema.omit({ id: true })

export type Food = z.infer<typeof FoodSchema>
export type CreateFood = z.infer<typeof CreateFoodSchema>
