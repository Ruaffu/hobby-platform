import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFood, getFoods } from "../api/foods"

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

export const useFoods = () => {
  return useQuery({
    queryKey: foodQueryKeys.all,
    queryFn: getFoods
  })
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
