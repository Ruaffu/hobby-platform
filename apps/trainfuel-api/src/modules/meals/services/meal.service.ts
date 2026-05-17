import type { CreateMealEntry, MealEntry } from "@hobby/contracts"
import type { MealEntryEntity } from "../entities/meal-entry.entity"
import { mealRepository } from "../repositories/meal.repository"

const toMealEntry = (entity: MealEntryEntity): MealEntry => {
  return {
    id: entity.id,
    food: {
      id: entity.food.id,
      name: entity.food.name,
      calories: entity.food.calories,
      protein: Number(entity.food.protein),
      carbs: Number(entity.food.carbs),
      fat: Number(entity.food.fat)
    },
    mealType: entity.mealType as MealEntry["mealType"],
    quantityGrams: Number(entity.quantityGrams),
    loggedAt: entity.loggedAt.toISOString()
  }
}

export const mealService = {
  async listMealEntries() {
    const mealEntries = await mealRepository.findAll()

    return mealEntries.map(toMealEntry)
  },

  async createMealEntry(input: CreateMealEntry) {
    const mealEntry = await mealRepository.create(input)

    if (!mealEntry) {
      throw new Error("Food not found")
    }

    return toMealEntry(mealEntry)
  }
}
