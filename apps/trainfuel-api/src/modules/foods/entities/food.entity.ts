import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "foods" })
export class FoodEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "text" })
  name!: string

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