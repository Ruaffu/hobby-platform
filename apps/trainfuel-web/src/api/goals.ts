import {
  type DailyGoal,
  DailyGoalSchema,
  type UpsertDailyGoal,
  UpsertDailyGoalSchema
} from "@hobby/contracts"
import { apiRequest } from "./apiClient"

export const getDailyGoal = async (): Promise<DailyGoal | null> => {
  const data = await apiRequest<unknown>("/goals/daily")

  return DailyGoalSchema.nullable().parse(data)
}

export const upsertDailyGoal = async (input: UpsertDailyGoal): Promise<DailyGoal> => {
  const body = UpsertDailyGoalSchema.parse(input)

  const data = await apiRequest<unknown>("/goals/daily", {
    method: "PUT",
    body
  })

  return DailyGoalSchema.parse(data)
}
