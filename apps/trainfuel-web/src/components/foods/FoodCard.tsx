import { Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useState } from "react"
import { DeleteFoodDialog } from "./DeleteFoodDialog"

type FoodCardProps = {
  food: Food
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
          onPress={() => setIsDeleteDialogOpen(true)}
        >
          Delete
        </Button>

        <DeleteFoodDialog
          food={food}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      </Card.Content>
    </Card>
  )
}
