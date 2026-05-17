import { os } from "@orpc/server"
import {
  CreateFoodSchema,
  DeleteFoodSchema,
  FoodListSchema,
  FoodSchema,
  UpdateFoodSchema
} from "../food"

// This file defines the public contract for food-related API procedures.
//
// Important:
// This should not contain database logic.
// This should not know about Express.
// This only describes API input/output and route metadata.

export const foodProcedures = {
  list: os
    // route() makes this procedure OpenAPI-compatible.
    // Later this can become GET /foods in the generated OpenAPI spec.
    .route({
      method: "GET",
      path: "/foods"
    })
    // No input is needed for listing all foods.
    .output(FoodListSchema),

  create: os
    .route({
      method: "POST",
      path: "/foods"
    })
    // The request body must match CreateFoodSchema.
    .input(CreateFoodSchema)
    // The response must match FoodSchema.
    .output(FoodSchema),

  update: os
    .route({
      method: "PATCH",
      path: "/foods/{id}"
    })
    .input(UpdateFoodSchema)
    .output(FoodSchema),

  delete: os
    .route({
      method: "DELETE",
      path: "/foods/{id}"
    })
    .input(DeleteFoodSchema)
    .output(FoodSchema)
}
