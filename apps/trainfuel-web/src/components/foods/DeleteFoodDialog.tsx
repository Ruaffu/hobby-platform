import { AlertDialog, Button } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useDeleteFood } from "../../queries/foodQueries"

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

            <AlertDialog.Body>
              This will permanently delete {food.name}. This action cannot be undone.
              {deleteFoodMutation.isError ? (
                <span className="text-danger">{deleteFoodMutation.error.message}</span>
              ) : null}
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button isDisabled={deleteFoodMutation.isPending} onPress={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button
                className="bg-red-600 text-white hover:bg-red-700"
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
