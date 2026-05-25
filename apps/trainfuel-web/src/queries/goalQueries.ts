import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getDailyGoal, upsertDailyGoal } from "../api/goals"

export const goalQueryKeys = {
  daily: ["dailyGoal"] as const
}

export const goalQueries = {
  daily: () =>
    queryOptions({
      queryKey: goalQueryKeys.daily,
      queryFn: getDailyGoal
    })
}

export const useDailyGoal = () => {
  return useQuery(goalQueries.daily())
}

export const useUpsertDailyGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: upsertDailyGoal,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: goalQueryKeys.daily
      })
    }
  })
}
