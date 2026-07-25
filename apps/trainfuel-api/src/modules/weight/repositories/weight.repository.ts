import type { CreateWeightEntry, UpdateWeightEntry } from "@hobby/contracts"
import { AppDataSource } from "../../../db/data-source"
import { WeightEntryEntity } from "../entities/weight-entry.entity"

const repository = AppDataSource.getRepository(WeightEntryEntity)

export const weightRepository = {
  async findAll() {
    return repository.find({
      order: {
        loggedAt: "DESC"
      }
    })
  },

  async create(input: CreateWeightEntry) {
    const weightEntry = repository.create({
      weightKg: String(input.weightKg),
      loggedAt: input.loggedAt ? new Date(input.loggedAt) : new Date()
    })

    return repository.save(weightEntry)
  },

  async update(input: UpdateWeightEntry) {
    const weightEntry = await repository.findOne({
      where: {
        id: input.id
      }
    })

    if (!weightEntry) {
      return null
    }

    if (input.weightKg !== undefined) {
      weightEntry.weightKg = String(input.weightKg)
    }

    if (input.loggedAt !== undefined) {
      weightEntry.loggedAt = new Date(input.loggedAt)
    }

    return repository.save(weightEntry)
  },

  async deleteById(id: string) {
    await repository.delete({
      id
    })

    return {
      id
    }
  }
}
