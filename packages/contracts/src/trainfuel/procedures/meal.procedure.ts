import { os } from "@orpc/server"
import {
  CreateMealEntrySchema,
  DeleteMealEntrySchema,
  MealEntryListSchema,
  MealEntrySchema,
  UpdateMealEntrySchema
} from "../meal/mealEntry"

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
    .output(MealEntrySchema),

  delete: os
    .route({
      method: "DELETE",
      path: "/meal-entries/{id}"
    })
    .input(DeleteMealEntrySchema)
    .output(MealEntrySchema),

  update: os
    .route({
      method: "PATCH",
      path: "/meal-entries/{id}"
    })
    .input(UpdateMealEntrySchema)
    .output(MealEntrySchema)
}
