import type { CreateMealEntry } from "@hobby/contracts"
import { AppDataSource } from "../../../db/data-source"
import { FoodEntity } from "../../foods/entities/food.entity"
import { MealEntryEntity } from "../entities/meal-entry.entity"

const mealEntryRepository = AppDataSource.getRepository(MealEntryEntity)
const foodRepository = AppDataSource.getRepository(FoodEntity)

export const mealRepository = {
  async findAll() {
    return mealEntryRepository.find({
      relations: {
        food: true
      },
      order: {
        loggedAt: "DESC"
      }
    })
  },

  async create(input: CreateMealEntry) {
    const food = await foodRepository.findOne({
      where: {
        id: input.foodId
      }
    })

    if (!food) {
      return null
    }

    const mealEntry = mealEntryRepository.create({
      food,
      mealType: input.mealType,
      quantityGrams: String(input.quantityGrams),
      loggedAt: input.loggedAt ? new Date(input.loggedAt) : new Date()
    })

    return mealEntryRepository.save(mealEntry)
  }
}
