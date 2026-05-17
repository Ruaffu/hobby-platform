import { os } from "@orpc/server"
import { CreateMealEntrySchema, MealEntryListSchema, MealEntrySchema } from "../meal/mealEntry"

export const mealProcedures = {
  list: os
    .route({
      method: "GET",
      path: "/meal-entries"
    })
    .output(MealEntryListSchema),

  create: os
    .route({
      method: "POST",
      path: "/meal-entries"
    })
    .input(CreateMealEntrySchema)
    .output(MealEntrySchema)
}
