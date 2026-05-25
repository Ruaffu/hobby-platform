import type { DailyGoal } from "@hobby/contracts"
import type { NutritionTotals } from "./nutritionTotals"

export type GoalProgress = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

const calculatePercent = (current: number, goal: number) => {
  if (goal <= 0) {
    return 0
  }

  return Math.min(100, Math.round((current / goal) * 100))
}

export const calculateGoalProgress = (totals: NutritionTotals, goal: DailyGoal): GoalProgress => {
  return {
    calories: calculatePercent(totals.calories, goal.calories),
    protein: calculatePercent(totals.protein, goal.protein),
    carbs: calculatePercent(totals.carbs, goal.carbs),
    fat: calculatePercent(totals.fat, goal.fat)
  }
}
