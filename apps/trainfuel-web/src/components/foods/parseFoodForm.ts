import { type CreateFood, CreateFoodSchema } from "@hobby/contracts"

const getRequiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== "string") {
    throw new Error(`Missing form field: ${key}`)
  }

  return value
}

const toNumber = (value: string) => {
  // Number("") returns 0, which is not what we want for form validation.
  //
  // So we trim first and manually return NaN for empty strings.
  // Zod will reject NaN when validating a normal number field.
  if (value.trim() === "") {
    return Number.NaN
  }

  return Number(value)
}

export const parseFoodForm = (formData: FormData): CreateFood => {
  const rawInput = {
    name: getRequiredString(formData, "name"),
    calories: toNumber(getRequiredString(formData, "calories")),
    protein: toNumber(getRequiredString(formData, "protein")),
    carbs: toNumber(getRequiredString(formData, "carbs")),
    fat: toNumber(getRequiredString(formData, "fat"))
  }

  return CreateFoodSchema.parse(rawInput)
}
