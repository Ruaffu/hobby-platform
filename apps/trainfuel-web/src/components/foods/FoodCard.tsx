import { Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"

type FoodCardProps = {
  food: Food
  onDeletePress: (food: Food) => void
}

export const FoodCard = ({ food, onDeletePress }: FoodCardProps) => {
  return (
    <Card className="p-4">
      <Card.Content className="flex items-center justify-between gap-4">
        <Card.Content className="p-0">
          <Card.Title>{food.name}</Card.Title>

          <Card.Description>
            {food.calories} kcal · {food.protein}g protein · {food.carbs}g carbs · {food.fat}g fat
          </Card.Description>
        </Card.Content>

        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onPress={() => onDeletePress(food)}
        >
          Delete
        </Button>
      </Card.Content>
    </Card>
  )
}
