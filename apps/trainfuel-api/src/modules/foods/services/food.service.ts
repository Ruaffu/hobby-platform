import type { CreateFood, Food } from "@hobby/contracts"
import type { FoodEntity } from "../entities/food.entity"
import { foodRepository } from "../repositories/food.repository"

const toFood = (entity: FoodEntity): Food => {
  return {
    id: entity.id,
    name: entity.name,
    calories: entity.calories,
    protein: parseFloat(entity.protein),
    carbs: parseFloat(entity.carbs),
    fat: parseFloat(entity.fat)
  }
}

export const foodService = {
  async listFoods() {
    const foods = await foodRepository.findAll()

    return foods.map(toFood)
  },

  async createFood(input: CreateFood) {
    const createdFood = await foodRepository.create(input)
    return toFood(createdFood)
  }
}
