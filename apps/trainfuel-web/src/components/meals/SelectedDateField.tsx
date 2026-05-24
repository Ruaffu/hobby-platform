import { FieldError, Input, Label, TextField } from "@heroui/react"

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
      <Label>Selected date</Label>

      <Input
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
