import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react"
import type { ComponentProps } from "react"
import { useCreateFood } from "../../queries/foodQueries"

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
          <TextField isRequired name="name">
            <Label>Name</Label>
            <Input placeholder="Chicken breast" />
            <FieldError />
          </TextField>

          <TextField isRequired name="calories" type="number">
            <Label>Calories</Label>
            <Input placeholder="120" />
            <FieldError />
          </TextField>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <TextField isRequired name="protein" type="number">
              <Label>Protein</Label>
              <Input placeholder="23" step="0.1" />
              <FieldError />
            </TextField>

            <TextField isRequired name="carbs" type="number">
              <Label>Carbs</Label>
              <Input placeholder="0" step="0.1" />
              <FieldError />
            </TextField>

            <TextField isRequired name="fat" type="number">
              <Label>Fat</Label>
              <Input placeholder="2" step="0.1" />
              <FieldError />
            </TextField>
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
