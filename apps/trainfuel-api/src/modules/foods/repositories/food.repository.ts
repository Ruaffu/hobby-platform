import type { CreateFood } from "@hobby/contracts"
import { AppDataSource } from "../../../db/data-source"
import { FoodEntity } from "../entities/food.entity"

const repository = AppDataSource.getRepository(FoodEntity)

export const foodRepository = {
  async findAll() {
    return repository.find({
      order: {
        createdAt: "DESC"
      }
    })
  },

  async create(input: CreateFood) {
    const food = repository.create({
      name: input.name,
      calories: input.calories,
      protein: String(input.protein),
      carbs: String(input.carbs),
      fat: String(input.fat)
    })
    return repository.save(food)
  },

  async deleteById(id: string) {
    const food = await repository.findOne({
      where: {
        id
      }
    })

    if (!food) {
      return null
    }
    await repository.delete({ id })

    return food
  }
}
