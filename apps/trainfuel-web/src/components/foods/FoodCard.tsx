import { Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useState } from "react"
import { EditFoodDialog } from "./EditFoodDialog"
import {
  ThemedCard,
  ThemedCardDescription,
  ThemedCardTitle
} from "../layout/ThemedCard"

type FoodCardProps = {
  food: Food
  onDeletePress: (food: Food) => void
}

export const FoodCard = ({ food, onDeletePress }: FoodCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <ThemedCard className="p-4">
      <Card.Content className="flex items-center justify-between gap-4">
        <Card.Content className="p-0">
          <ThemedCardTitle>{food.name}</ThemedCardTitle>

          <ThemedCardDescription>
            {food.calories} kcal · {food.protein}g protein · {food.carbs}g carbs · {food.fat}g fat
          </ThemedCardDescription>
        </Card.Content>

        <Button
          className="bg-default-100 text-default-900 hover:bg-default-200"
          onPress={() => setIsEditDialogOpen(true)}
        >
          Edit
        </Button>

        <Button className="trainfuel-danger-button" onPress={() => onDeletePress(food)}>
          Delete
        </Button>

        <EditFoodDialog food={food} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      </Card.Content>
    </ThemedCard>
  )
}
