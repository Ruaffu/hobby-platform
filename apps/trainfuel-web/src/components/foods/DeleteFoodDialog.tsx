import { AlertDialog, Button, Card } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useDeleteFood } from "../../queries/foodQueries"
import {
  ThemedCardDescription
} from "../layout/ThemedCard"

type DeleteFoodDialogProps = {
  food: Food
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const DeleteFoodDialog = ({ food, isOpen, onOpenChange }: DeleteFoodDialogProps) => {
  const deleteFoodMutation = useDeleteFood()

  const handleDelete = () => {
    deleteFoodMutation.mutate(food.id, {
      onSuccess: () => {
        onOpenChange(false)
      }
    })
  }

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete food?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="flex flex-col gap-3">
              <ThemedCardDescription>
                This will permanently delete {food.name}. This action cannot be undone.
              </ThemedCardDescription>

              {deleteFoodMutation.isError ? (
                <Card className="border border-red-200 bg-red-50">
                  <Card.Content className="px-3 py-2">
                    <Card.Description className="text-red-700">
                      {deleteFoodMutation.error.message}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ) : null}
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button isDisabled={deleteFoodMutation.isPending} onPress={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button
                className="trainfuel-danger-button"
                isDisabled={deleteFoodMutation.isPending}
                onPress={handleDelete}
              >
                {deleteFoodMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  )
}
