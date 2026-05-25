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
import {
  ThemedCard,
  ThemedCardDescription,
  ThemedCardTitle
} from "../layout/ThemedCard"

type WeeklyCaloriesChartProps = {
  mealEntries: MealEntry[]
}

export const WeeklyCaloriesChart = ({ mealEntries }: WeeklyCaloriesChartProps) => {
  const weeklyNutrition = calculateWeeklyNutrition(mealEntries)

  return (
    <ThemedCard>
      <Card.Header>
        <ThemedCardTitle>Weekly calories</ThemedCardTitle>
        <ThemedCardDescription>Calories logged over the last 7 days</ThemedCardDescription>
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
    </ThemedCard>
  )
}
