import { Button, Card } from "@heroui/react"
import type { MealEntry } from "@hobby/contracts"
import {
  getMealTypeLabel,
  groupMealEntriesByMealType
} from "../../features/nutrition/groupMealEntries"
import { useDeleteMealEntry } from "../../queries/mealEntryQueries"

type MealEntryListProps = {
  mealEntries: MealEntry[]
}

const calculateMealCalories = (mealEntry: MealEntry) => {
  return mealEntry.food.calories * (mealEntry.quantityGrams / 100)
}

export const MealEntryList = ({ mealEntries }: MealEntryListProps) => {
  const deleteMealEntryMutation = useDeleteMealEntry()
  const groups = groupMealEntriesByMealType(mealEntries)

  if (mealEntries.length === 0) {
    return <Card.Description>No meals logged for this day yet.</Card.Description>
  }

  return (
    <Card.Content className="grid gap-4 p-0">
      {groups.map((group) => (
        <Card key={group.mealType} className="p-4">
          <Card.Header>
            <Card.Title>{getMealTypeLabel(group.mealType)}</Card.Title>
            <Card.Description>
              {group.mealEntries.length} logged item
              {group.mealEntries.length === 1 ? "" : "s"}
            </Card.Description>
          </Card.Header>

          <Card.Content className="grid gap-2">
            {group.mealEntries.length === 0 ? <Card.Description>No items.</Card.Description> : null}

            {group.mealEntries.map((mealEntry) => (
              <Card key={mealEntry.id} className="p-3">
                <Card.Content className="flex items-center justify-between gap-4 p-0">
                  <Card.Content className="p-0">
                    <Card.Title>{mealEntry.food.name}</Card.Title>

                    <Card.Description>
                      {mealEntry.quantityGrams}g · {Math.round(calculateMealCalories(mealEntry))}{" "}
                      kcal
                    </Card.Description>
                  </Card.Content>

                  <Button
                    className="shrink-0 bg-red-600 text-white hover:bg-red-700"
                    isDisabled={deleteMealEntryMutation.isPending}
                    onPress={() => {
                      deleteMealEntryMutation.mutate(mealEntry.id)
                    }}
                  >
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      ))}
    </Card.Content>
  )
}
