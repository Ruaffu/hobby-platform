import { foodProcedures } from "@hobby/contracts"
import { foodService } from "../modules/foods/services/food.service"
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
    })
  }
}
