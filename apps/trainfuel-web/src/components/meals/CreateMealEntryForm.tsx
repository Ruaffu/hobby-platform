import { Button, Card, FieldError, Form, Input, ListBox, Select, TextField } from "@heroui/react"
import type { Food, MealType } from "@hobby/contracts"
import { type ComponentProps, useState } from "react"
import { ZodError } from "zod"
import { toLocalNoonIsoString } from "../../features/dates/dateFilters"
import { useCreateMealEntry } from "../../queries/mealEntryQueries"
import {
  ThemedCard,
  ThemedCardDescription,
  ThemedCardTitle,
  ThemedLabel
} from "../layout/ThemedCard"

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

type CreateMealEntryFormProps = {
  foods: Food[]
  selectedDate: Date
}

const mealTypes: Array<{
  id: MealType
  label: string
}> = [
  {
    id: "breakfast",
    label: "Breakfast"
  },
  {
    id: "lunch",
    label: "Lunch"
  },
  {
    id: "dinner",
    label: "Dinner"
  },
  {
    id: "snack",
    label: "Snack"
  }
]

const getRequiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing form field: ${key}`)
  }

  return value
}

const toNumber = (value: string) => {
  if (value.trim() === "") {
    return Number.NaN
  }

  return Number(value)
}

export const CreateMealEntryForm = ({ foods, selectedDate }: CreateMealEntryFormProps) => {
  const createMealEntryMutation = useCreateMealEntry()
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      const input = {
        foodId: getRequiredString(formData, "foodId"),
        mealType: getRequiredString(formData, "mealType") as MealType,
        quantityGrams: toNumber(getRequiredString(formData, "quantityGrams")),
        loggedAt: toLocalNoonIsoString(selectedDate)
      }

      setValidationError(null)

      createMealEntryMutation.mutate(input, {
        onSuccess: () => {
          formElement.reset()
        }
      })
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.issues[0]?.message ?? "Invalid meal entry")
        return
      }

      if (error instanceof Error) {
        setValidationError(error.message)
        return
      }

      setValidationError("Invalid meal entry")
    }
  }

  return (
    <ThemedCard>
      <Card.Header>
        <ThemedCardTitle>Log meal</ThemedCardTitle>
        <ThemedCardDescription>
          Choose a food and log how many grams you ate for the selected date.
        </ThemedCardDescription>
      </Card.Header>

      <Card.Content>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select isRequired name="foodId" placeholder="Choose food">
            <ThemedLabel>Food</ThemedLabel>
            <Select.Trigger className="trainfuel-select-trigger">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {foods.map((food) => (
                  <ListBox.Item id={food.id} key={food.id} textValue={food.name}>
                    {food.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            <FieldError />
          </Select>

          <Select isRequired name="mealType" placeholder="Choose meal">
            <ThemedLabel>Meal</ThemedLabel>
            <Select.Trigger className="trainfuel-select-trigger">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {mealTypes.map((mealType) => (
                  <ListBox.Item id={mealType.id} key={mealType.id} textValue={mealType.label}>
                    {mealType.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            <FieldError />
          </Select>

          <TextField isRequired name="quantityGrams">
            <ThemedLabel>Quantity in grams</ThemedLabel>
            <Input className="trainfuel-input" placeholder="200" type="number" />
            <FieldError />
          </TextField>

          <Button
            className="trainfuel-primary-button"
            isDisabled={createMealEntryMutation.isPending || foods.length === 0}
            type="submit"
          >
            {createMealEntryMutation.isPending ? "Logging meal..." : "Log meal"}
          </Button>

          {foods.length === 0 ? (
            <ThemedCardDescription>Add a food before logging a meal.</ThemedCardDescription>
          ) : null}

          {validationError ? (
            <Card className="border border-red-200 bg-red-50">
              <Card.Content className="px-3 py-2">
                <Card.Description className="text-red-700">{validationError}</Card.Description>
              </Card.Content>
            </Card>
          ) : null}

          {createMealEntryMutation.isError ? (
            <Card className="border border-red-200 bg-red-50">
              <Card.Content className="px-3 py-2">
                <Card.Description className="text-red-700">
                  {createMealEntryMutation.error.message}
                </Card.Description>
              </Card.Content>
            </Card>
          ) : null}
        </Form>
      </Card.Content>
    </ThemedCard>
  )
}
