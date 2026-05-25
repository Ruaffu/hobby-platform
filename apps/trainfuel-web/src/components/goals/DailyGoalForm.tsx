import { Button, Card, Form } from "@heroui/react"
import { type DailyGoal, type UpsertDailyGoal, UpsertDailyGoalSchema } from "@hobby/contracts"
import { type ComponentProps, useState } from "react"
import { ZodError } from "zod"
import { useUpsertDailyGoal } from "../../queries/goalQueries"
import { FoodFormField } from "../foods/FoodFormField"
import {
  ThemedCard,
  ThemedCardDescription,
  ThemedCardTitle
} from "../layout/ThemedCard"

type DailyGoalFormProps = {
  dailyGoal: DailyGoal | null
}

type FormSubmitHandler = NonNullable<ComponentProps<typeof Form>["onSubmit"]>

const getRequiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== "string") {
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

export const DailyGoalForm = ({ dailyGoal }: DailyGoalFormProps) => {
  const upsertDailyGoalMutation = useUpsertDailyGoal()
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const input: UpsertDailyGoal = UpsertDailyGoalSchema.parse({
        calories: toNumber(getRequiredString(formData, "calories")),
        protein: toNumber(getRequiredString(formData, "protein")),
        carbs: toNumber(getRequiredString(formData, "carbs")),
        fat: toNumber(getRequiredString(formData, "fat"))
      })

      setValidationError(null)

      upsertDailyGoalMutation.mutate(input)
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.issues[0]?.message ?? "Invalid daily goal")
        return
      }

      setValidationError("Invalid daily goal")
    }
  }

  return (
    <ThemedCard>
      <Card.Header>
        <ThemedCardTitle>Daily goals</ThemedCardTitle>
        <ThemedCardDescription>Set your target calories and macros.</ThemedCardDescription>
      </Card.Header>

      <Card.Content>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FoodFormField
            isRequired
            defaultValue={dailyGoal ? String(dailyGoal.calories) : undefined}
            inputProps={{
              type: "number"
            }}
            label="Calories"
            name="calories"
            placeholder="1800"
          />

          <Card.Content className="grid grid-cols-1 gap-4 p-0 md:grid-cols-3">
            <FoodFormField
              isRequired
              defaultValue={dailyGoal ? String(dailyGoal.protein) : undefined}
              inputProps={{
                step: "0.1",
                type: "number"
              }}
              label="Protein"
              name="protein"
              placeholder="170"
            />

            <FoodFormField
              isRequired
              defaultValue={dailyGoal ? String(dailyGoal.carbs) : undefined}
              inputProps={{
                step: "0.1",
                type: "number"
              }}
              label="Carbs"
              name="carbs"
              placeholder="160"
            />

            <FoodFormField
              isRequired
              defaultValue={dailyGoal ? String(dailyGoal.fat) : undefined}
              inputProps={{
                step: "0.1",
                type: "number"
              }}
              label="Fat"
              name="fat"
              placeholder="50"
            />
          </Card.Content>

          <Button
            className="trainfuel-primary-button"
            isDisabled={upsertDailyGoalMutation.isPending}
            type="submit"
          >
            {upsertDailyGoalMutation.isPending ? "Saving goals..." : "Save goals"}
          </Button>

          {validationError ? (
            <Card className="border border-red-200 bg-red-50">
              <Card.Content className="px-3 py-2">
                <Card.Description className="text-red-700">{validationError}</Card.Description>
              </Card.Content>
            </Card>
          ) : null}

          {upsertDailyGoalMutation.isError ? (
            <Card className="border border-red-200 bg-red-50">
              <Card.Content className="px-3 py-2">
                <Card.Description className="text-red-700">
                  {upsertDailyGoalMutation.error.message}
                </Card.Description>
              </Card.Content>
            </Card>
          ) : null}

          {upsertDailyGoalMutation.isSuccess ? (
            <ThemedCardDescription>Goals saved.</ThemedCardDescription>
          ) : null}
        </Form>
      </Card.Content>
    </ThemedCard>
  )
}
