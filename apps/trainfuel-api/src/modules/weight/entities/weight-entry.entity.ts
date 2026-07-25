import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "weight_entries" })
export class WeightEntryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ name: "weight_kg", type: "numeric", precision: 5, scale: 2 })
  weightKg!: string

  @Column({ name: "logged_at", type: "timestamptz" })
  loggedAt!: Date

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date
}
