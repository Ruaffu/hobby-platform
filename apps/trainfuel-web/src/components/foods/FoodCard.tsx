import { Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useState } from "react"
import { EditFoodDialog } from "./EditFoodDialog"

type FoodCardProps = {
  food: Food
  onDeletePress: (food: Food) => void
}

export const FoodCard = ({ food, onDeletePress }: FoodCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

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
          className="bg-default-100 text-default-900 hover:bg-default-200"
          onPress={() => setIsEditDialogOpen(true)}
        >
          Edit
        </Button>

        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onPress={() => onDeletePress(food)}
        >
          Delete
        </Button>

        <EditFoodDialog food={food} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      </Card.Content>
    </Card>
  )
}
