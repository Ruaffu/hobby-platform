import type { CreateWeightEntry, UpdateWeightEntry, WeightEntry } from "@hobby/contracts"
import type { WeightEntryEntity } from "../entities/weight-entry.entity"
import { weightRepository } from "../repositories/weight.repository"

const toWeightEntry = (entity: WeightEntryEntity): WeightEntry => ({
  id: entity.id,
  weightKg: Number(entity.weightKg),
  loggedAt: entity.loggedAt.toISOString()
})

export const weightService = {
  async findAll() {
    const weightEntries = await weightRepository.findAll()

    return weightEntries.map(toWeightEntry)
  },

  async create(input: CreateWeightEntry) {
    const weightEntry = await weightRepository.create(input)

    return toWeightEntry(weightEntry)
  },

  async update(input: UpdateWeightEntry) {
    const weightEntry = await weightRepository.update(input)

    if (!weightEntry) {
      throw new Error("Weight entry not found")
    }

    return toWeightEntry(weightEntry)
  },

  async delete(input: { id: string }) {
    return weightRepository.deleteById(input.id)
  }
}
