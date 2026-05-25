import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "daily_goals" })
export class DailyGoalEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "int" })
  calories!: number

  @Column({ type: "numeric", precision: 8, scale: 2 })
  protein!: string

  @Column({ type: "numeric", precision: 8, scale: 2 })
  carbs!: string

  @Column({ type: "numeric", precision: 8, scale: 2 })
  fat!: string

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date
}
