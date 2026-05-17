import { Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useState } from "react"
import { DeleteFoodDialog } from "./DeleteFoodDialog"
import { FoodCard } from "./FoodCard"

type FoodListProps = {
  foods: Food[]
}

export const FoodList = ({ foods }: FoodListProps) => {
  const [foodToDelete, setFoodToDelete] = useState<Food | null>(null)

  if (foods.length === 0) {
    return <Card.Description>No foods added yet.</Card.Description>
  }

  return (
    <>
      <Card.Content className="grid gap-3 p-0">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onDeletePress={setFoodToDelete} />
        ))}
      </Card.Content>

      {foodToDelete ? (
        <DeleteFoodDialog
          food={foodToDelete}
          isOpen={foodToDelete !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setFoodToDelete(null)
            }
          }}
        />
      ) : null}
    </>
  )
}
