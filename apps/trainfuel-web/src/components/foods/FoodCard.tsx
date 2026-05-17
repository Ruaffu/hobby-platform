import { Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useDeleteFood } from "../../queries/foodQueries"

type FoodCardProps = {
  food: Food
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const deleteFoodMutation = useDeleteFood()
  return (
    <Card className="p-4">
      <Card.Content>
        <Card.Title>{food.name}</Card.Title>
        <Card.Description>
          {food.calories} kcal · {food.protein} protein · {food.carbs} carbs · {food.fat} fat{" "}
        </Card.Description>
      </Card.Content>
      <Button
        className="bg-red-600 text-white hover:bg-red-700"
        isDisabled={deleteFoodMutation.isPending}
        onPress={() => deleteFoodMutation.mutate(food.id)}
      >
        {deleteFoodMutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </Card>
  )
}
