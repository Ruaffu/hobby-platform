import { Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"

type FoodCardProps = {
  food: Food
}

export const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <Card className="p-4">
      <Card.Content>
        <Card.Title>{food.name}</Card.Title>
        <Card.Description>
          {food.calories} kcal · {food.protein} protein · {food.carbs} carbs · {food.fat} fat{" "}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
