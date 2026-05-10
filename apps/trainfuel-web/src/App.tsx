import { Card } from "@heroui/react"
import { CreateFoodForm } from "./components/foods/CreateFoodForm"
import { useFoods } from "./queries/foodQueries"

function App() {
  const foodsQuery = useFoods()

  return (
    <Card className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-6">
      <Card.Header>
        <Card.Title>TrainFuel</Card.Title>
        <Card.Description>Simple food and macro tracking for everyday meals.</Card.Description>
      </Card.Header>

      <Card.Content className="flex flex-col gap-8">
        <CreateFoodForm />

        <Card>
          <Card.Header>
            <Card.Title>Foods</Card.Title>
            <Card.Description>Your reusable food items.</Card.Description>
          </Card.Header>

          <Card.Content className="grid gap-3">
            {foodsQuery.isLoading && <Card.Description>Loading foods...</Card.Description>}

            {foodsQuery.isError && (
              <Card.Description className="text-danger">Could not load foods.</Card.Description>
            )}

            {foodsQuery.isSuccess &&
              foodsQuery.data.map((food) => (
                <Card key={food.id} className="p-4">
                  <Card.Content>
                    <Card.Title>{food.name}</Card.Title>
                    <Card.Description>
                      {food.calories} kcal · {food.protein}g protein · {food.carbs}g carbs ·{" "}
                      {food.fat}g fat
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  )
}

export default App
