import { foodProcedures, goalProcedures, mealProcedures, weightProcedures } from "@hobby/contracts"
import { foodService } from "../modules/foods/services/food.service"
import { goalService } from "../modules/goals/services/goal.service"
import { mealService } from "../modules/meals/services/meal.service"
import { weightService } from "../modules/weight/services/weight.service"
// This file implements the API procedures.
//
// The contract says:
// - what procedures exist
// - what input/output they use
// - what HTTP route metadata they have
//
// This file says:
// - what the server actually does when those procedures are called

export const router = {
  foods: {
    list: foodProcedures.list.handler(async () => {
      return foodService.listFoods()
    }),

    create: foodProcedures.create.handler(async ({ input }) => {
      return foodService.createFood(input)
    }),

    delete: foodProcedures.delete.handler(async ({ input }) => {
      return foodService.deleteFood(input.id)
    }),

    update: foodProcedures.update.handler(async ({ input }) => {
      return foodService.updateFood(input)
    })
  },
  meals: {
    list: mealProcedures.list.handler(async () => {
      return mealService.listMealEntries()
    }),

    create: mealProcedures.create.handler(async ({ input }) => {
      return mealService.createMealEntry(input)
    }),

    delete: mealProcedures.delete.handler(async ({ input }) => {
      return mealService.deleteMealEntry(input.id)
    }),

    update: mealProcedures.update.handler(async ({ input }) => {
      return mealService.updateMealEntry(input)
    })
  },
  goals: {
    getDaily: goalProcedures.getDaily.handler(async () => {
      return goalService.getDailyGoal()
    }),

    upsertDaily: goalProcedures.upsertDaily.handler(async ({ input }) => {
      return goalService.upsertDailyGoal(input)
    })
  },

  weight: {
    list: weightProcedures.list.handler(() => weightService.findAll()),

    create: weightProcedures.create.handler(({ input }) => weightService.create(input)),

    update: weightProcedures.update.handler(({ input }) => weightService.update(input)),

    delete: weightProcedures.delete.handler(({ input }) => weightService.delete(input))
  }
}
