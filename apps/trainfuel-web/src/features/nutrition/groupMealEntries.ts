import type { MealEntry, MealType } from "@hobby/contracts"

const mealTypeOrder: MealType[] = ["breakfast", "lunch", "dinner", "snack"]

export type MealEntryGroup = {
  mealType: MealType
  mealEntries: MealEntry[]
}

export const getMealTypeLabel = (mealType: MealType) => {
  return mealType.charAt(0).toUpperCase() + mealType.slice(1)
}

export const groupMealEntriesByMealType = (mealEntries: MealEntry[]): MealEntryGroup[] => {
  return mealTypeOrder.map((mealType) => {
    return {
      mealType,
      mealEntries: mealEntries.filter((mealEntry) => mealEntry.mealType === mealType)
    }
  })
}
