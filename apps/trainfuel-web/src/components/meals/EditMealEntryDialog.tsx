import {
  AlertDialog,
  Button,
  Card,
  FieldError,
  Form,
  Input,
  ListBox,
  Select,
  TextField
} from "@heroui/react"
import { type Food, type MealEntry, type MealType, UpdateMealEntrySchema } from "@hobby/contracts"
import { type ComponentProps, useState } from "react"
import { ZodError } from "zod"
import { useUpdateMealEntry } from "../../queries/mealEntryQueries"
import { ThemedLabel } from "../layout/ThemedCard"

type EditMealEntryDialogProps = {
  mealEntry: MealEntry
  foods: Food[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

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

export const EditMealEntryDialog = ({
  mealEntry,
  foods,
  isOpen,
  onOpenChange
}: EditMealEntryDialogProps) => {
  const updateMealEntryMutation = useUpdateMealEntry()
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      const input = UpdateMealEntrySchema.parse({
        id: mealEntry.id,
        foodId: getRequiredString(formData, "foodId"),
        mealType: getRequiredString(formData, "mealType"),
        quantityGrams: toNumber(getRequiredString(formData, "quantityGrams")),
        loggedAt: mealEntry.loggedAt
      })

      setValidationError(null)

      updateMealEntryMutation.mutate(input, {
        onSuccess: () => {
          onOpenChange(false)
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
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop className="trainfuel-dialog-backdrop">
        <AlertDialog.Container className="trainfuel-dialog-container">
          <AlertDialog.Dialog className="trainfuel-dialog">
            <AlertDialog.Header>
              <AlertDialog.Heading>Edit meal entry</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Select
                  isRequired
                  defaultSelectedKey={mealEntry.food.id}
                  name="foodId"
                  placeholder="Choose food"
                >
                  <ThemedLabel>Food</ThemedLabel>

                  <Select.Trigger className="trainfuel-select-trigger">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="trainfuel-select-popover">
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

                <Select
                  isRequired
                  defaultSelectedKey={mealEntry.mealType}
                  name="mealType"
                  placeholder="Choose meal"
                >
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

                <TextField
                  isRequired
                  defaultValue={String(mealEntry.quantityGrams)}
                  name="quantityGrams"
                >
                  <ThemedLabel>Quantity in grams</ThemedLabel>
                  <Input className="trainfuel-input" placeholder="200" type="number" />
                  <FieldError />
                </TextField>

                {validationError ? (
                  <Card className="border border-red-200 bg-red-50">
                    <Card.Content className="px-3 py-2">
                      <Card.Description className="text-red-700">
                        {validationError}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ) : null}

                {updateMealEntryMutation.isError ? (
                  <Card className="border border-red-200 bg-red-50">
                    <Card.Content className="px-3 py-2">
                      <Card.Description className="text-red-700">
                        {updateMealEntryMutation.error.message}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ) : null}

                <AlertDialog.Footer>
                  <Button
                    className="trainfuel-secondary-button"
                    isDisabled={updateMealEntryMutation.isPending}
                    onPress={() => {
                      onOpenChange(false)
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="trainfuel-primary-button"
                    isDisabled={updateMealEntryMutation.isPending}
                    type="submit"
                  >
                    {updateMealEntryMutation.isPending ? "Saving..." : "Save changes"}
                  </Button>
                </AlertDialog.Footer>
              </Form>
            </AlertDialog.Body>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  )
}
