import { os } from "@orpc/server"
import {
  CreateWeightEntrySchema,
  DeleteWeightEntrySchema,
  UpdateWeightEntrySchema,
  WeightEntryListSchema,
  WeightEntrySchema
} from "../weight/weightEntry"

export const weightProcedures = {
  list: os
    .route({
      method: "GET",
      path: "/weight-entries",
      summary: "List weight entries"
    })
    .output(WeightEntryListSchema),

  create: os
    .route({
      method: "POST",
      path: "/weight-entries",
      summary: "Create a new weight entry"
    })
    .input(CreateWeightEntrySchema)
    .output(WeightEntrySchema),

  update: os
    .route({
      method: "PATCH",
      path: "/weight-entries/{id}",
      summary: "Update a weight entry"
    })
    .input(UpdateWeightEntrySchema)
    .output(WeightEntrySchema),

  delete: os
    .route({
      method: "DELETE",
      path: "/weight-entries/{id}",
      summary: "Delete a weight entry"
    })
    .input(DeleteWeightEntrySchema)
    .output(DeleteWeightEntrySchema)
}
