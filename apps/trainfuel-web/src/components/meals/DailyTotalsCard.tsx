import { Card } from "@heroui/react"
import type { MealEntry } from "@hobby/contracts"
import { calculateNutritionTotals } from "../../features/nutrition/nutritionTotals"

type DailyTotalsCardProps = {
  mealEntries: MealEntry[]
}

const formatNumber = (value: number) => {
  return Math.round(value)
}

export const DailyTotalsCard = ({ mealEntries }: DailyTotalsCardProps) => {
  const totals = calculateNutritionTotals(mealEntries)

  return (
    <Card>
      <Card.Header>
        <Card.Title>Today&apos;s totals</Card.Title>
        <Card.Description>
          Estimated intake from meals logged for the selected day.
        </Card.Description>
      </Card.Header>

      <Card.Content className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="p-4">
          <Card.Content>
            <Card.Description>Calories</Card.Description>
            <Card.Title>{formatNumber(totals.calories)} kcal</Card.Title>
          </Card.Content>
        </Card>

        <Card className="p-4">
          <Card.Content>
            <Card.Description>Protein</Card.Description>
            <Card.Title>{formatNumber(totals.protein)}g</Card.Title>
          </Card.Content>
        </Card>

        <Card className="p-4">
          <Card.Content>
            <Card.Description>Carbs</Card.Description>
            <Card.Title>{formatNumber(totals.carbs)}g</Card.Title>
          </Card.Content>
        </Card>

        <Card className="p-4">
          <Card.Content>
            <Card.Description>Fat</Card.Description>
            <Card.Title>{formatNumber(totals.fat)}g</Card.Title>
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  )
}
