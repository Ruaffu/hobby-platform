import type { MealEntry } from "@hobby/contracts"

export type NutritionTotals = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

const emptyTotals: NutritionTotals = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
}

const calculateMultiplier = (mealEntry: MealEntry) => {
  // Foods store nutrition per 100g.
  // Meal entries store grams eaten.
  //
  // Example:
  // 200g eaten means multiplier = 2.
  return mealEntry.quantityGrams / 100
}

export const calculateMealEntryTotals = (mealEntry: MealEntry): NutritionTotals => {
  const multiplier = calculateMultiplier(mealEntry)

  return {
    calories: mealEntry.food.calories * multiplier,
    protein: mealEntry.food.protein * multiplier,
    carbs: mealEntry.food.carbs * multiplier,
    fat: mealEntry.food.fat * multiplier
  }
}

export const calculateNutritionTotals = (mealEntries: MealEntry[]): NutritionTotals => {
  return mealEntries.reduce<NutritionTotals>((totals, mealEntry) => {
    const mealTotals = calculateMealEntryTotals(mealEntry)

    return {
      calories: totals.calories + mealTotals.calories,
      protein: totals.protein + mealTotals.protein,
      carbs: totals.carbs + mealTotals.carbs,
      fat: totals.fat + mealTotals.fat
    }
  }, emptyTotals)
}
