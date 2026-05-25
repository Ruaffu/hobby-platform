import type { UpsertDailyGoal } from "@hobby/contracts"
import { AppDataSource } from "../../../db/data-source"
import { DailyGoalEntity } from "../entities/daily-goal.entity"

const repository = AppDataSource.getRepository(DailyGoalEntity)

export const goalRepository = {
  async findCurrentDailyGoal() {
    return repository
      .find({
        order: {
          createdAt: "DESC"
        },
        take: 1
      })
      .then((goals) => {
        return goals[0] ?? null
      })
  },

  async upsertDailyGoal(input: UpsertDailyGoal) {
    const currentGoal = await this.findCurrentDailyGoal()

    if (!currentGoal) {
      const goal = repository.create({
        calories: input.calories,
        protein: String(input.protein),
        carbs: String(input.carbs),
        fat: String(input.fat)
      })

      return repository.save(goal)
    }

    currentGoal.calories = input.calories
    currentGoal.protein = String(input.protein)
    currentGoal.carbs = String(input.carbs)
    currentGoal.fat = String(input.fat)

    return repository.save(currentGoal)
  }
}
