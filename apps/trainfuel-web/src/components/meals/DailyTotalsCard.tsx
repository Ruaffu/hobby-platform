import { Card } from "@heroui/react"
import type { DailyGoal, MealEntry } from "@hobby/contracts"
import { calculateGoalProgress } from "../../features/nutrition/goalProgress"
import { calculateNutritionTotals } from "../../features/nutrition/nutritionTotals"

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
        className="h-full rounded-full bg-blue-600 p-0"
        style={{
          width: `${value}%`
        }}
      />
    </Card.Content>
  )
}

const MacroStatCard = ({ label, value, unit, goal, progress }: MacroStatCardProps) => {
  return (
    <Card className="p-4">
      <Card.Content className="gap-2">
        <Card.Description>{label}</Card.Description>

        <Card.Title>
          {formatNumber(value)} {unit}
        </Card.Title>

        {goal !== undefined && progress !== undefined ? (
          <>
            <Card.Description>
              Goal: {formatNumber(goal)} {unit}
            </Card.Description>

            <ProgressBar value={progress} />
          </>
        ) : null}
      </Card.Content>
    </Card>
  )
}

export const DailyTotalsCard = ({ mealEntries, dailyGoal }: DailyTotalsCardProps) => {
  const totals = calculateNutritionTotals(mealEntries)
  const progress = dailyGoal ? calculateGoalProgress(totals, dailyGoal) : null

  return (
    <Card>
      <Card.Header>
        <Card.Title>Daily totals</Card.Title>
        <Card.Description>
          Estimated intake from meals logged for the selected day.
        </Card.Description>
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
    </Card>
  )
}
