import { Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { FoodCard } from "./FoodCard"

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
        <FoodCard key={food.id} food={food} />
      ))}
    </Card.Content>
  )
}
