import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createMealEntry, getMealEntries } from "../api/mealEntries"

export const mealEntryQueryKeys = {
  all: ["mealEntries"] as const
}

export const mealEntryQueries = {
  list: () =>
    queryOptions({
      queryKey: mealEntryQueryKeys.all,
      queryFn: getMealEntries
    })
}

export const useMealEntries = () => {
  return useQuery(mealEntryQueries.list())
}

export const useCreateMealEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMealEntry,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: mealEntryQueryKeys.all
      })
    }
  })
}
