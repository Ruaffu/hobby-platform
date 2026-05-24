import type { MealEntry } from "@hobby/contracts"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createMealEntry, deleteMealEntry, getMealEntries } from "../api/mealEntries"

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

export const useDeleteMealEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMealEntry,

    onMutate: async (mealEntryId) => {
      await queryClient.cancelQueries({
        queryKey: mealEntryQueryKeys.all
      })

      const previousMealEntries = queryClient.getQueryData<MealEntry[]>(mealEntryQueryKeys.all)

      queryClient.setQueryData<MealEntry[]>(mealEntryQueryKeys.all, (currentMealEntries) => {
        if (!currentMealEntries) {
          return currentMealEntries
        }

        return currentMealEntries.filter((mealEntry) => mealEntry.id !== mealEntryId)
      })

      return {
        previousMealEntries
      }
    },

    onError: (_error, _mealEntryId, context) => {
      if (context?.previousMealEntries) {
        queryClient.setQueryData(mealEntryQueryKeys.all, context.previousMealEntries)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: mealEntryQueryKeys.all
      })
    }
  })
}
