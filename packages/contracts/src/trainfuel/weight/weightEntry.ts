import { z } from "zod"

export const WeightEntrySchema = z.object({
  id: z.uuid(),
  weightKg: z.number().positive("Weight must be greater than 0"),
  loggedAt: z.iso.datetime()
})

export const WeightEntryListSchema = z.array(WeightEntrySchema)

export const CreateWeightEntrySchema = z.object({
  weightKg: z.number().positive("Weight must be greater than 0"),
  loggedAt: z.iso.datetime().optional()
})

export const UpdateWeightEntrySchema = CreateWeightEntrySchema.partial().extend({
  id: z.uuid()
})

export const DeleteWeightEntrySchema = z.object({
  id: z.uuid()
})

export type WeightEntry = z.infer<typeof WeightEntrySchema>
export type CreateWeightEntry = z.infer<typeof CreateWeightEntrySchema>
export type UpdateWeightEntry = z.infer<typeof UpdateWeightEntrySchema>
export type DeleteWeightEntry = z.infer<typeof DeleteWeightEntrySchema>
