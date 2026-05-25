import { Card } from "@heroui/react"
import type { DailyGoal, MealEntry } from "@hobby/contracts"
import { calculateGoalProgress } from "../../features/nutrition/goalProgress"
import { calculateNutritionTotals } from "../../features/nutrition/nutritionTotals"
import {
  ThemedCard,
  ThemedCardDescription,
  ThemedCardTitle
} from "../layout/ThemedCard"

type DailyTotalsCardProps = {
  mealEntries: MealEntry[]
  dailyGoal: DailyGoal | null
}

type MacroStatCardProps = {
  label: string
  value: number
  unit: string
  goal?: number
  progress?: number
}

type ProgressBarProps = {
  value: number
}

const formatNumber = (value: number) => {
  return Math.round(value)
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <Card.Content className="h-2 overflow-hidden rounded-full bg-default-100 p-0">
      <Card.Content
        className="trainfuel-progress-bar h-full rounded-full bg-blue-600 p-0"
        style={{
          width: `${value}%`
        }}
      />
    </Card.Content>
  )
}

const MacroStatCard = ({ label, value, unit, goal, progress }: MacroStatCardProps) => {
  return (
    <ThemedCard className="p-4">
      <Card.Content className="gap-2">
        <ThemedCardDescription>{label}</ThemedCardDescription>

        <ThemedCardTitle>
          {formatNumber(value)} {unit}
        </ThemedCardTitle>

        {goal !== undefined && progress !== undefined ? (
          <>
            <ThemedCardDescription>
              Goal: {formatNumber(goal)} {unit}
            </ThemedCardDescription>

            <ProgressBar value={progress} />
          </>
        ) : null}
      </Card.Content>
    </ThemedCard>
  )
}

export const DailyTotalsCard = ({ mealEntries, dailyGoal }: DailyTotalsCardProps) => {
  const totals = calculateNutritionTotals(mealEntries)
  const progress = dailyGoal ? calculateGoalProgress(totals, dailyGoal) : null

  return (
    <ThemedCard>
      <Card.Header>
        <ThemedCardTitle>Daily totals</ThemedCardTitle>
        <ThemedCardDescription>
          Estimated intake from meals logged for the selected day.
        </ThemedCardDescription>
      </Card.Header>

      <Card.Content className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MacroStatCard
          goal={dailyGoal?.calories}
          label="Calories"
          progress={progress?.calories}
          unit="kcal"
          value={totals.calories}
        />

        <MacroStatCard
          goal={dailyGoal?.protein}
          label="Protein"
          progress={progress?.protein}
          unit="g"
          value={totals.protein}
        />

        <MacroStatCard
          goal={dailyGoal?.carbs}
          label="Carbs"
          progress={progress?.carbs}
          unit="g"
          value={totals.carbs}
        />

        <MacroStatCard
          goal={dailyGoal?.fat}
          label="Fat"
          progress={progress?.fat}
          unit="g"
          value={totals.fat}
        />
      </Card.Content>
    </ThemedCard>
  )
}
