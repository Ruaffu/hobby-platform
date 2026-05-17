import { Button, Card, Form } from "@heroui/react"
import type { ComponentProps } from "react"
import { useCreateFood } from "../../queries/foodQueries"
import { FoodFormField } from "./FoodFormField"

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

const getRequiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== "string") {
    throw new Error(`Missing form field: ${key}`)
  }

  return value
}

export const CreateFoodForm = () => {
  const createFoodMutation = useCreateFood()

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    createFoodMutation.mutate(
      {
        name: getRequiredString(formData, "name"),
        calories: Number(getRequiredString(formData, "calories")),
        protein: Number(getRequiredString(formData, "protein")),
        carbs: Number(getRequiredString(formData, "carbs")),
        fat: Number(getRequiredString(formData, "fat"))
      },
      {
        onSuccess: () => {
          formElement.reset()
        }
      }
    )
  }

  return (
    <Card className="max-w-xl">
      <Card.Header>
        <Card.Title>Add food</Card.Title>
        <Card.Description>Add a reusable food with calories and macros.</Card.Description>
      </Card.Header>

      <Card.Content>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FoodFormField isRequired label="Name" name="name" placeholder="Chicken breast" />

          <FoodFormField
            isRequired
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
              inputProps={{
                step: "0.1",
                type: "number"
              }}
              label="Fat"
              name="fat"
              placeholder="2"
            />
          </div>

          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            isPending={createFoodMutation.isPending}
            type="submit"
          >
            {createFoodMutation.isPending ? "Adding food..." : "Add food"}
          </Button>

          {createFoodMutation.isError && (
            <span className="text-sm text-danger">Could not create food.</span>
          )}
        </Form>
      </Card.Content>
    </Card>
  )
}
