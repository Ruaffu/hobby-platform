import { Button, Card, Table } from "@heroui/react"
import type { MealEntry } from "@hobby/contracts"
import {
  getMealTypeLabel,
  groupMealEntriesByMealType
} from "../../features/nutrition/groupMealEntries"
import { useDeleteMealEntry } from "../../queries/mealEntryQueries"

type MealEntryListProps = {
  mealEntries: MealEntry[]
}

type MealEntryMacros = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

const calculateMealEntryMacros = (mealEntry: MealEntry): MealEntryMacros => {
  const multiplier = mealEntry.quantityGrams / 100

  return {
    calories: mealEntry.food.calories * multiplier,
    protein: mealEntry.food.protein * multiplier,
    carbs: mealEntry.food.carbs * multiplier,
    fat: mealEntry.food.fat * multiplier
  }
}

const formatNumber = (value: number) => {
  return Math.round(value)
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
        <Card key={group.mealType}>
          <Card.Header>
            <Card.Title>{getMealTypeLabel(group.mealType)}</Card.Title>
            <Card.Description>
              {group.mealEntries.length} logged item
              {group.mealEntries.length === 1 ? "" : "s"}
            </Card.Description>
          </Card.Header>

          <Card.Content>
            {group.mealEntries.length === 0 ? (
              <Card.Description>No items.</Card.Description>
            ) : (
              <Table>
                <Table.ScrollContainer>
                  <Table.Content aria-label={`${getMealTypeLabel(group.mealType)} meals`}>
                    <Table.Header>
                      <Table.Column>Food</Table.Column>
                      <Table.Column>Grams</Table.Column>
                      <Table.Column>Calories</Table.Column>
                      <Table.Column>Protein</Table.Column>
                      <Table.Column>Carbs</Table.Column>
                      <Table.Column>Fat</Table.Column>
                      <Table.Column>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {group.mealEntries.map((mealEntry) => {
                        const macros = calculateMealEntryMacros(mealEntry)

                        return (
                          <Table.Row key={mealEntry.id}>
                            <Table.Cell>{mealEntry.food.name}</Table.Cell>
                            <Table.Cell>{mealEntry.quantityGrams}g</Table.Cell>
                            <Table.Cell>{formatNumber(macros.calories)} kcal</Table.Cell>
                            <Table.Cell>{formatNumber(macros.protein)}g</Table.Cell>
                            <Table.Cell>{formatNumber(macros.carbs)}g</Table.Cell>
                            <Table.Cell>{formatNumber(macros.fat)}g</Table.Cell>
                            <Table.Cell>
                              <Button
                                className="bg-red-600 text-white hover:bg-red-700"
                                isDisabled={deleteMealEntryMutation.isPending}
                                onPress={() => {
                                  deleteMealEntryMutation.mutate(mealEntry.id)
                                }}
                              >
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            )}
          </Card.Content>
        </Card>
      ))}
    </Card.Content>
  )
}
