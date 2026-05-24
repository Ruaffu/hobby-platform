import { CreateFoodForm } from "./components/foods/CreateFoodForm"
import { FoodList } from "./components/foods/FoodList"
import { Page, PageHeader, SectionCard } from "./components/layout/Page"
import { StatusText } from "./components/layout/StatusText"
import { CreateMealEntryForm } from "./components/meals/CreateMealEntryForm"
import { MealEntryList } from "./components/meals/MealEntryList"
import { useFoods } from "./queries/foodQueries"
import { useMealEntries } from "./queries/mealEntryQueries"

function App() {
  const foodsQuery = useFoods()
  const mealEntriesQuery = useMealEntries()

  return (
    <Page>
      <PageHeader
        title="TrainFuel"
        description="Simple food and macro tracking for everyday meals."
      />

      <CreateFoodForm />

      {foodsQuery.isSuccess ? <CreateMealEntryForm foods={foodsQuery.data} /> : null}

      <SectionCard title="Foods" description="Your reusable food items.">
        {foodsQuery.isLoading ? <StatusText>Loading foods...</StatusText> : null}

        {foodsQuery.isError ? <StatusText tone="danger">Could not load foods.</StatusText> : null}

        {foodsQuery.isSuccess ? <FoodList foods={foodsQuery.data} /> : null}
      </SectionCard>

      <SectionCard title="Meal log" description="Foods you have logged.">
        {mealEntriesQuery.isLoading ? <StatusText>Loading meal entries...</StatusText> : null}

        {mealEntriesQuery.isError ? (
          <StatusText tone="danger">Could not load meal entries.</StatusText>
        ) : null}

        {mealEntriesQuery.isSuccess ? <MealEntryList mealEntries={mealEntriesQuery.data} /> : null}
      </SectionCard>
    </Page>
  )
}

export default App
