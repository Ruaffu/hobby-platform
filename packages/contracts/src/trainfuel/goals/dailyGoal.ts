import { z } from "zod"

export const DailyGoalSchema = z.object({
  id: z.uuid(),
  calories: z
    .number()
    .int("Calories must be a whole number")
    .nonnegative("Calories cannot be negative"),
  protein: z.number().nonnegative("Protein cannot be negative"),
  carbs: z.number().nonnegative("Carbs cannot be negative"),
  fat: z.number().nonnegative("Fat cannot be negative")
})

export const UpsertDailyGoalSchema = DailyGoalSchema.omit({
  id: true
})

export type DailyGoal = z.infer<typeof DailyGoalSchema>
export type UpsertDailyGoal = z.infer<typeof UpsertDailyGoalSchema>
