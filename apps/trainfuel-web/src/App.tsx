import { Tabs } from "@heroui/react"
import { useState } from "react"
import { CreateFoodForm } from "./components/foods/CreateFoodForm"
import { FoodList } from "./components/foods/FoodList"
import {
  AppGrid,
  DashboardGrid,
  Page,
  PageHeader,
  SectionCard,
  Stack
} from "./components/layout/Page"
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
  const [selectedTab, setSelectedTab] = useState<"today" | "foods">("today")

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

      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => {
          setSelectedTab(key as "today" | "foods")
        }}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="TrainFuel sections">
            <Tabs.Tab id="today">
              <Tabs.Indicator />
              Today
            </Tabs.Tab>

            <Tabs.Tab id="foods">
              <Tabs.Indicator />
              Foods
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="today">
          <Stack>
            <DashboardGrid>
              {mealEntriesQuery.isSuccess ? (
                <DailyTotalsCard mealEntries={selectedDateMealEntries} />
              ) : null}

              {mealEntriesQuery.isSuccess ? (
                <WeeklyCaloriesChart mealEntries={mealEntriesQuery.data} />
              ) : null}
            </DashboardGrid>

            {foodsQuery.isSuccess ? (
              <CreateMealEntryForm foods={foodsQuery.data} selectedDate={selectedDate} />
            ) : null}

            <SectionCard
              title="Selected day meals"
              description="Meals grouped by breakfast, lunch, dinner, and snack."
            >
              {mealEntriesQuery.isLoading ? <StatusText>Loading meal entries...</StatusText> : null}

              {mealEntriesQuery.isError ? (
                <StatusText tone="danger">Could not load meal entries.</StatusText>
              ) : null}

              {mealEntriesQuery.isSuccess ? (
                <MealEntryList mealEntries={selectedDateMealEntries} />
              ) : null}
            </SectionCard>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel id="foods">
          <Stack>
            <CreateFoodForm />

            <SectionCard title="Foods" description="Manage your reusable foods.">
              {foodsQuery.isLoading ? <StatusText>Loading foods...</StatusText> : null}

              {foodsQuery.isError ? (
                <StatusText tone="danger">Could not load foods.</StatusText>
              ) : null}

              {foodsQuery.isSuccess ? <FoodList foods={foodsQuery.data} /> : null}
            </SectionCard>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Page>
  )
}

export default App
