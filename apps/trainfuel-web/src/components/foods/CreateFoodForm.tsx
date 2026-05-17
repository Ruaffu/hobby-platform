import { Button, Card, Form } from "@heroui/react"
import { type ComponentProps, useState } from "react"
import { ZodError } from "zod"
import { useCreateFood } from "../../queries/foodQueries"
import { FoodFormField } from "./FoodFormField"
import { parseFoodForm } from "./parseFoodForm"

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

export const CreateFoodForm = () => {
  const createFoodMutation = useCreateFood()

  // This stores a simple form-level validation message.
  //
  // Later we can improve this to field-level errors.
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    try {
      const input = parseFoodForm(formData)

      setValidationError(null)
      createFoodMutation.mutate(input, {
        onSuccess: () => {
          formElement.reset()
        }
      })
    } catch (error) {
      if (error instanceof ZodError) {
        // For now we show only the first validation issue.
        //
        // This keeps the UI simple while still teaching the validation flow.
        setValidationError(error.issues[0]?.message ?? "Invalid food input")
        return
      }
      setValidationError("Invalid food input")
    }
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

          {validationError ? (
            <Card.Description className="text-danger">{validationError}</Card.Description>
          ) : null}

          {createFoodMutation.isError ? (
            <Card.Description className="text-danger">Could not create food.</Card.Description>
          ) : null}
        </Form>
      </Card.Content>
    </Card>
  )
}
