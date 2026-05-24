import type { MealEntry } from "@hobby/contracts"
import { calculateNutritionTotals, type NutritionTotals } from "./nutritionTotals"

export type DailyNutritionPoint = NutritionTotals & {
  date: string
  label: string
}

const startOfLocalDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

const toDateKey = (date: Date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-")
}

const toDayLabel = (date: Date) => {
  return new Intl.DateTimeFormat("en-DK", {
    weekday: "short"
  }).format(date)
}

const getLastSevenDays = () => {
  const today = startOfLocalDay(new Date())

  return Array.from({ length: 7 }, (_item, index) => {
    return addDays(today, index - 6)
  })
}

const groupMealEntriesByDate = (mealEntries: MealEntry[]) => {
  return mealEntries.reduce<Record<string, MealEntry[]>>((groups, mealEntry) => {
    const dateKey = toDateKey(new Date(mealEntry.loggedAt))

    return {
      ...groups,
      [dateKey]: [...(groups[dateKey] ?? []), mealEntry]
    }
  }, {})
}

export const calculateWeeklyNutrition = (mealEntries: MealEntry[]): DailyNutritionPoint[] => {
  const groups = groupMealEntriesByDate(mealEntries)

  return getLastSevenDays().map((date) => {
    const dateKey = toDateKey(date)
    const totals = calculateNutritionTotals(groups[dateKey] ?? [])

    return {
      date: dateKey,
      label: toDayLabel(date),
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein),
      carbs: Math.round(totals.carbs),
      fat: Math.round(totals.fat)
    }
  })
}
