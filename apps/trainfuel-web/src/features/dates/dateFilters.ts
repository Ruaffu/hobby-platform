import type { MealEntry } from "@hobby/contracts"

const isSameLocalDate = (left: Date, right: Date) => {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export const filterMealEntriesForDate = (mealEntries: MealEntry[], date: Date): MealEntry[] => {
  return mealEntries.filter((mealEntry) => {
    const loggedAt = new Date(mealEntry.loggedAt)

    return isSameLocalDate(loggedAt, date)
  })
}

export const filterMealEntriesForToday = (mealEntries: MealEntry[]): MealEntry[] => {
  return filterMealEntriesForDate(mealEntries, new Date())
}

export const toLocalNoonIsoString = (date: Date) => {
  const localNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)

  return localNoon.toISOString()
}
