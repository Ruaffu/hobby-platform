import { FieldError, Input, TextField } from "@heroui/react"
import {
ThemedLabel
} from "../layout/ThemedCard"

type SelectedDateFieldProps = {
  selectedDate: Date
  onSelectedDateChange: (date: Date) => void
}

const toDateInputValue = (date: Date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-")
}

export const SelectedDateField = ({
  selectedDate,
  onSelectedDateChange
}: SelectedDateFieldProps) => {
  return (
    <TextField>
      <ThemedLabel>Selected date</ThemedLabel>

      <Input
      className="trainfuel-input"
        type="date"
        value={toDateInputValue(selectedDate)}
        onChange={(event) => {
          onSelectedDateChange(new Date(`${event.currentTarget.value}T00:00:00`))
        }}
      />

      <FieldError />
    </TextField>
  )
}
