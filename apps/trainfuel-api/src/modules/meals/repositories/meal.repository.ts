import type { CreateMealEntry, UpdateMealEntry } from "@hobby/contracts"
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
  },

  async deleteById(id: string) {
    const mealEntry = await mealEntryRepository.findOne({
      where: {
        id
      },
      relations: {
        food: true
      }
    })

    if (!mealEntry) {
      return null
    }

    await mealEntryRepository.delete({
      id
    })

    return mealEntry
  },

  async update(input: UpdateMealEntry) {
    const mealEntry = await mealEntryRepository.findOne({
      where: {
        id: input.id
      },
      relations: {
        food: true
      }
    })

    if (!mealEntry) {
      return null
    }

    if (input.foodId !== undefined) {
      const food = await foodRepository.findOne({
        where: {
          id: input.foodId
        }
      })

      if (!food) {
        return null
      }

      mealEntry.food = food
    }

    if (input.mealType !== undefined) {
      mealEntry.mealType = input.mealType
    }

    if (input.quantityGrams !== undefined) {
      mealEntry.quantityGrams = String(input.quantityGrams)
    }

    if (input.loggedAt !== undefined) {
      mealEntry.loggedAt = new Date(input.loggedAt)
    }

    return mealEntryRepository.save(mealEntry)
  }
}
