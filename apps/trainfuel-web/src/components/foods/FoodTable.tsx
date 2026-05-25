import { Button, Card, Table } from "@heroui/react"
import type { Food } from "@hobby/contracts"
import { useMemo, useState } from "react"
import { calculatePageCount, paginate } from "../../features/pagination/paginate"
import { DeleteFoodDialog } from "./DeleteFoodDialog"
import { EditFoodDialog } from "./EditFoodDialog"

type FoodTableProps = {
  foods: Food[]
}

const pageSize = 10

const formatMacro = (value: number) => {
  return `${value}g`
}

export const FoodTable = ({ foods }: FoodTableProps) => {
  const [page, setPage] = useState(1)
  const [foodToEdit, setFoodToEdit] = useState<Food | null>(null)
  const [foodToDelete, setFoodToDelete] = useState<Food | null>(null)

  const pageCount = calculatePageCount(foods.length, pageSize)

  const visibleFoods = useMemo(() => {
    return paginate(foods, page, pageSize)
  }, [foods, page])

  if (foods.length === 0) {
    return <Card.Description>No foods added yet.</Card.Description>
  }

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Foods table">
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Calories</Table.Column>
              <Table.Column>Protein</Table.Column>
              <Table.Column>Carbs</Table.Column>
              <Table.Column>Fat</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {visibleFoods.map((food) => (
                <Table.Row key={food.id}>
                  <Table.Cell>{food.name}</Table.Cell>
                  <Table.Cell>{food.calories} kcal</Table.Cell>
                  <Table.Cell>{formatMacro(food.protein)}</Table.Cell>
                  <Table.Cell>{formatMacro(food.carbs)}</Table.Cell>
                  <Table.Cell>{formatMacro(food.fat)}</Table.Cell>
                  <Table.Cell>
                    <Card.Content className="flex flex-row gap-2 p-0">
                      <Button
                        className="bg-default-100 text-default-900 hover:bg-default-200"
                        onPress={() => {
                          setFoodToEdit(food)
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        className="trainfuel-danger-button"
                        onPress={() => {
                          setFoodToDelete(food)
                        }}
                      >
                        Delete
                      </Button>
                    </Card.Content>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <Card.Content className="flex flex-row items-center justify-between gap-4 p-0">
            <Card.Description>
              Page {page} of {pageCount} · Showing {visibleFoods.length} of {foods.length} foods
            </Card.Description>

            <Card.Content className="flex flex-row gap-2 p-0">
              <Button
                isDisabled={page === 1}
                onPress={() => {
                  setPage((currentPage) => Math.max(1, currentPage - 1))
                }}
              >
                Previous
              </Button>

              <Button
                isDisabled={page === pageCount}
                onPress={() => {
                  setPage((currentPage) => Math.min(pageCount, currentPage + 1))
                }}
              >
                Next
              </Button>
            </Card.Content>
          </Card.Content>
        </Table.Footer>
      </Table>

      {foodToEdit ? (
        <EditFoodDialog
          food={foodToEdit}
          isOpen={foodToEdit !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setFoodToEdit(null)
            }
          }}
        />
      ) : null}

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
