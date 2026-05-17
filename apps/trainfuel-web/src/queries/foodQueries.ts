import type { Food } from "@hobby/contracts"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFood, deleteFood, getFoods, updateFood } from "../api/foods"

// Query keys should be centralized.
//
// This prevents typo bugs like:
// ["food"]
// ["foods"]
// ["Foods"]
//
// Later, we can expand this into nested keys:
// foodQueryKeys.detail(id)
// foodQueryKeys.search(filters)
export const foodQueryKeys = {
  all: ["foods"] as const
}

export const foodQueries = {
  list: () =>
    queryOptions({
      queryKey: foodQueryKeys.all,
      queryFn: getFoods
    })
}

export const useFoods = () => {
  return useQuery(foodQueries.list())
}

export const useCreateFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFood,

    onSuccess: async () => {
      // After creating a food, the cached food list is outdated.
      //
      // invalidateQueries tells TanStack Query:
      // "Mark this query as stale and refetch it if it is currently used."
      await queryClient.invalidateQueries({
        queryKey: foodQueryKeys.all
      })
    }
  })
}

export const useDeleteFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFood,

    onMutate: async (foodId) => {
      await queryClient.cancelQueries({
        queryKey: foodQueryKeys.all
      })

      const previousFoods = queryClient.getQueryData<Food[]>(foodQueryKeys.all)

      queryClient.setQueryData<Food[]>(foodQueryKeys.all, (currentFoods) => {
        if (!currentFoods) {
          return currentFoods
        }

        return currentFoods.filter((food) => food.id !== foodId)
      })

      return {
        previousFoods
      }
    },

    onError: (_error, _foodId, context) => {
      if (context?.previousFoods) {
        queryClient.setQueryData(foodQueryKeys.all, context.previousFoods)
      }
    },

    onSettled: () => {
      // Do not await this.
      //
      // If the API is down, the refetch can fail/retry.
      // Awaiting it would keep the mutation pending longer than needed.
      void queryClient.invalidateQueries({
        queryKey: foodQueryKeys.all
      })
    }
  })
}

export const useUpdateFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFood,

    onSuccess: async () => {
      // Updating a food changes the foods list.
      // Refetch the list so the UI shows the saved values.
      await queryClient.invalidateQueries({
        queryKey: foodQueryKeys.all
      })
    }
  })
}
