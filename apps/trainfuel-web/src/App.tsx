import { CreateFoodForm } from "./components/foods/CreateFoodForm"
import { FoodList } from "./components/foods/FoodList"
import { Page, PageHeader, SectionCard } from "./components/layout/Page"
import { StatusText } from "./components/layout/StatusText"
import { useFoods } from "./queries/foodQueries"

function App() {
  const foodsQuery = useFoods()

  return (
    <Page>
      <PageHeader
        title="TrainFuel"
        description="Simple food and macro tracking for everyday meals."
      />

      <CreateFoodForm />

      <SectionCard title="Foods" description="Your reusable food items.">
        {foodsQuery.isLoading ? <StatusText>Loading foods...</StatusText> : null}

        {foodsQuery.isError ? <StatusText tone="danger">Could not load foods.</StatusText> : null}

        {foodsQuery.isSuccess ? <FoodList foods={foodsQuery.data} /> : null}
      </SectionCard>
    </Page>
  )
}

export default App
