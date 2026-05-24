import { Card } from "@heroui/react"
import type { MealEntry } from "@hobby/contracts"

type MealEntryListProps = {
  mealEntries: MealEntry[]
}

const calculateMealCalories = (mealEntry: MealEntry) => {
  return mealEntry.food.calories * (mealEntry.quantityGrams / 100)
}

const formatMealType = (mealType: MealEntry["mealType"]) => {
  return mealType.charAt(0).toUpperCase() + mealType.slice(1)
}

export const MealEntryList = ({ mealEntries }: MealEntryListProps) => {
  if (mealEntries.length === 0) {
    return <Card.Description>No meals logged yet.</Card.Description>
  }

  return (
    <Card.Content className="grid gap-3 p-0">
      {mealEntries.map((mealEntry) => (
        <Card key={mealEntry.id} className="p-4">
          <Card.Content>
            <Card.Title>
              {formatMealType(mealEntry.mealType)} · {mealEntry.food.name}
            </Card.Title>

            <Card.Description>
              {mealEntry.quantityGrams}g · {Math.round(calculateMealCalories(mealEntry))} kcal
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Content>
  )
}
