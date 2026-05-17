import { foodProcedures, mealProcedures } from "@hobby/contracts"
import { foodService } from "../modules/foods/services/food.service"
import { mealService } from "../modules/meals/services/meal.service"

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
    })
  }
}
