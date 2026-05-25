import { FieldError, Input, TextField } from "@heroui/react"
import { ThemedLabel } from "../layout/ThemedCard"
import type { ComponentProps } from "react"

type FoodFormFieldProps = Omit<ComponentProps<typeof TextField>, "children" | "name"> & {
  name: string
  label: string
  placeholder?: string
  inputProps?: ComponentProps<typeof Input>
}

export const FoodFormField = ({
  name,
  label,
  placeholder,
  inputProps,
  ...textFieldProps
}: FoodFormFieldProps) => {
  return (
    <TextField isRequired name={name} {...textFieldProps}>
      <ThemedLabel>{label}</ThemedLabel>
      <Input className={`trainfuel-input ${inputProps?.className ?? ""}`} placeholder={placeholder} {...inputProps} />
      <FieldError />
    </TextField>
  )
}
