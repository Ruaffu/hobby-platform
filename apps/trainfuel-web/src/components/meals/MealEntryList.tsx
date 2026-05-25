import { Button, Card, Table } from "@heroui/react"
import type { Food, MealEntry } from "@hobby/contracts"
import { useState } from "react"
import {
  getMealTypeLabel,
  groupMealEntriesByMealType
} from "../../features/nutrition/groupMealEntries"
import { useDeleteMealEntry } from "../../queries/mealEntryQueries"
import { EditMealEntryDialog } from "./EditMealEntryDialog"
import {
  ThemedCardDescription,
  ThemedCardTitle
} from "../layout/ThemedCard"

type MealEntryListProps = {
  mealEntries: MealEntry[]
  foods: Food[]
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

export const MealEntryList = ({ mealEntries, foods }: MealEntryListProps) => {
  const deleteMealEntryMutation = useDeleteMealEntry()
  const groups = groupMealEntriesByMealType(mealEntries)
  const [mealEntryToEdit, setMealEntryToEdit] = useState<MealEntry | null>(null)

  if (mealEntries.length === 0) {
    return <ThemedCardDescription>No meals logged for this day yet.</ThemedCardDescription>
  }

  return (
    <>
      <Card.Content className="grid gap-4 p-0">
        {groups.map((group) => (
          <Card key={group.mealType}>
            <Card.Header>
              <ThemedCardTitle>{getMealTypeLabel(group.mealType)}</ThemedCardTitle>
              <ThemedCardDescription>
                {group.mealEntries.length} logged item
                {group.mealEntries.length === 1 ? "" : "s"}
              </ThemedCardDescription>
            </Card.Header>

            <Card.Content>
              {group.mealEntries.length === 0 ? (
                <ThemedCardDescription>No items.</ThemedCardDescription>
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
                                <Card.Content className="flex flex-row gap-2 p-0">
                                  <Button
                                    className="bg-default-100 text-default-900 hover:bg-default-200"
                                    onPress={() => {
                                      setMealEntryToEdit(mealEntry)
                                    }}
                                  >
                                    Edit
                                  </Button>

                                  <Button
                                    className="trainfuel-danger-button"
                                    isDisabled={deleteMealEntryMutation.isPending}
                                    onPress={() => {
                                      deleteMealEntryMutation.mutate(mealEntry.id)
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Card.Content>
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

      {mealEntryToEdit ? (
        <EditMealEntryDialog
          foods={foods}
          mealEntry={mealEntryToEdit}
          isOpen={mealEntryToEdit !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setMealEntryToEdit(null)
            }
          }}
        />
      ) : null}
    </>
  )
}
