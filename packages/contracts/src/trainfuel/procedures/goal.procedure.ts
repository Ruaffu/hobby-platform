import { os } from "@orpc/server"
import { DailyGoalSchema, UpsertDailyGoalSchema } from "../goals/dailyGoal"

export const goalProcedures = {
  getDaily: os
    .route({
      method: "GET",
      path: "/goals/daily"
    })
    .output(DailyGoalSchema.nullable()),

  upsertDaily: os
    .route({
      method: "PUT",
      path: "/goals/daily"
    })
    .input(UpsertDailyGoalSchema)
    .output(DailyGoalSchema)
}
