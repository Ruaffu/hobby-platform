import { FieldError, Input, Label, TextField } from "@heroui/react"
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
      <Label>{label}</Label>
      <Input placeholder={placeholder} {...inputProps} />
      <FieldError />
    </TextField>
  )
}
