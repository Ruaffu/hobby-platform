import { Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"

type FoodListProps = {
  foods: Food[]
}

export const FoodList = ({ foods }: FoodListProps) => {
  if (foods.length === 0) {
    return <Card.Description>No foods added yet.</Card.Description>
  }

  return (
    <Card.Content className="grid gap-3 p-0">
      {foods.map((food) => (
        <Card key={food.id} className="p-4">
          <Card.Content>
            <Card.Title>{food.name}</Card.Title>
            <Card.Description>
              {food.calories} kcal · {food.protein}g protein · {food.carbs}g carbs · {food.fat}g fat
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Content>
  )
}
