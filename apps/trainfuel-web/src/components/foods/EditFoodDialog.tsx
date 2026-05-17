import { AlertDialog, Button, Card, Form } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { type ComponentProps, useState } from "react"
import { ZodError } from "zod"
import { useUpdateFood } from "../../queries/foodQueries"
import { FoodFormField } from "./FoodFormField"
import { parseFoodForm } from "./parseFoodForm"

type EditFoodDialogProps = {
  food: Food
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

export const EditFoodDialog = ({ food, isOpen, onOpenChange }: EditFoodDialogProps) => {
  const updateFoodMutation = useUpdateFood()
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      // Reuse the create-food form parser because edit currently uses the same fields.
      //
      // parseFoodForm returns:
      // name, calories, protein, carbs, fat
      const formInput = parseFoodForm(formData)

      setValidationError(null)

      updateFoodMutation.mutate(
        {
          id: food.id,
          ...formInput
        },
        {
          onSuccess: () => {
            onOpenChange(false)
          }
        }
      )
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.issues[0]?.message ?? "Invalid food input")
        return
      }

      setValidationError("Invalid food input")
    }
  }

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.Header>
              <AlertDialog.Heading>Edit food</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FoodFormField
                  isRequired
                  defaultValue={food.name}
                  label="Name"
                  name="name"
                  placeholder="Chicken breast"
                />

                <FoodFormField
                  isRequired
                  defaultValue={String(food.calories)}
                  inputProps={{
                    type: "number"
                  }}
                  label="Calories"
                  name="calories"
                  placeholder="120"
                />

                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                  <FoodFormField
                    isRequired
                    defaultValue={String(food.protein)}
                    inputProps={{
                      step: "0.1",
                      type: "number"
                    }}
                    label="Protein"
                    name="protein"
                    placeholder="23"
                  />

                  <FoodFormField
                    isRequired
                    defaultValue={String(food.carbs)}
                    inputProps={{
                      step: "0.1",
                      type: "number"
                    }}
                    label="Carbs"
                    name="carbs"
                    placeholder="0"
                  />

                  <FoodFormField
                    isRequired
                    defaultValue={String(food.fat)}
                    inputProps={{
                      step: "0.1",
                      type: "number"
                    }}
                    label="Fat"
                    name="fat"
                    placeholder="2"
                  />
                </div>

                {validationError ? (
                  <Card className="border border-red-200 bg-red-50">
                    <Card.Content className="px-3 py-2">
                      <Card.Description className="text-red-700">
                        {validationError}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ) : null}

                {updateFoodMutation.isError ? (
                  <Card className="border border-red-200 bg-red-50">
                    <Card.Content className="px-3 py-2">
                      <Card.Description className="text-red-700">
                        {updateFoodMutation.error.message}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ) : null}

                <AlertDialog.Footer>
                  <Button
                    isDisabled={updateFoodMutation.isPending}
                    onPress={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    isDisabled={updateFoodMutation.isPending}
                    type="submit"
                  >
                    {updateFoodMutation.isPending ? "Saving..." : "Save changes"}
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
