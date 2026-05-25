import type { DailyGoal, UpsertDailyGoal } from "@hobby/contracts"
import type { DailyGoalEntity } from "../entities/daily-goal.entity"
import { goalRepository } from "../repositories/goal.repository"

const toDailyGoal = (entity: DailyGoalEntity): DailyGoal => {
  return {
    id: entity.id,
    calories: entity.calories,
    protein: Number(entity.protein),
    carbs: Number(entity.carbs),
    fat: Number(entity.fat)
  }
}

export const goalService = {
  async getDailyGoal() {
    const goal = await goalRepository.findCurrentDailyGoal()

    if (!goal) {
      return null
    }

    return toDailyGoal(goal)
  },

  async upsertDailyGoal(input: UpsertDailyGoal) {
    const goal = await goalRepository.upsertDailyGoal(input)

    return toDailyGoal(goal)
  }
}
