import { Card } from "@heroui/react"
import type { MealEntry } from "@hobby/contracts"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { calculateWeeklyNutrition } from "../../features/nutrition/weeklyNutrition"

type WeeklyCaloriesChartProps = {
  mealEntries: MealEntry[]
}

export const WeeklyCaloriesChart = ({ mealEntries }: WeeklyCaloriesChartProps) => {
  const weeklyNutrition = calculateWeeklyNutrition(mealEntries)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Weekly calories</Card.Title>
        <Card.Description>Calories logged over the last 7 days</Card.Description>
      </Card.Header>

      <Card.Content>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyNutrition}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line dataKey="calories" name="Calories" type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  )
}
