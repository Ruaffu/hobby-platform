import { useState } from "react"
import { CreateFoodForm } from "./components/foods/CreateFoodForm"
import { FoodList } from "./components/foods/FoodList"
import { Page, PageHeader, SectionCard } from "./components/layout/Page"
import { StatusText } from "./components/layout/StatusText"
import { CreateMealEntryForm } from "./components/meals/CreateMealEntryForm"
import { DailyTotalsCard } from "./components/meals/DailyTotalsCard"
import { MealEntryList } from "./components/meals/MealEntryList"
import { SelectedDateField } from "./components/meals/SelectedDateField"
import { WeeklyCaloriesChart } from "./components/meals/WeeklyCaloriesChart"
import { filterMealEntriesForDate } from "./features/dates/dateFilters"
import { useFoods } from "./queries/foodQueries"
import { useMealEntries } from "./queries/mealEntryQueries"

function App() {
  const foodsQuery = useFoods()
  const mealEntriesQuery = useMealEntries()

  const [selectedDate, setSelectedDate] = useState(() => new Date())

  const selectedDateMealEntries = mealEntriesQuery.isSuccess
    ? filterMealEntriesForDate(mealEntriesQuery.data, selectedDate)
    : []

  return (
    <Page>
      <PageHeader
        title="TrainFuel"
        description="Simple food and macro tracking for everyday meals."
      />

      <SelectedDateField selectedDate={selectedDate} onSelectedDateChange={setSelectedDate} />

      <CreateFoodForm />

      {foodsQuery.isSuccess ? <CreateMealEntryForm foods={foodsQuery.data} /> : null}

      {mealEntriesQuery.isSuccess ? (
        <DailyTotalsCard mealEntries={selectedDateMealEntries} />
      ) : null}

      {mealEntriesQuery.isSuccess ? (
        <WeeklyCaloriesChart mealEntries={mealEntriesQuery.data} />
      ) : null}

      <SectionCard title="Foods" description="Your reusable food items.">
        {foodsQuery.isLoading ? <StatusText>Loading foods...</StatusText> : null}

        {foodsQuery.isError ? <StatusText tone="danger">Could not load foods.</StatusText> : null}

        {foodsQuery.isSuccess ? <FoodList foods={foodsQuery.data} /> : null}
      </SectionCard>

      <SectionCard title="Selected day meals" description="Foods logged for the selected day.">
        {mealEntriesQuery.isLoading ? <StatusText>Loading meal entries...</StatusText> : null}

        {mealEntriesQuery.isError ? (
          <StatusText tone="danger">Could not load meal entries.</StatusText>
        ) : null}

        {mealEntriesQuery.isSuccess ? (
          <MealEntryList mealEntries={selectedDateMealEntries} />
        ) : null}
      </SectionCard>
    </Page>
  )
}

export default App
