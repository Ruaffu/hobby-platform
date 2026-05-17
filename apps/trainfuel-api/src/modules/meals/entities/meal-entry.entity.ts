import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { FoodEntity } from "../../foods/entities/food.entity"

@Entity({ name: "meal_entries" })
export class MealEntryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => FoodEntity, {
    nullable: false,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "food_id" })
  food!: FoodEntity

  @Column({ name: "meal_type", type: "text" })
  mealType!: string

  @Column({ name: "quantity_grams", type: "numeric", precision: 8, scale: 2 })
  quantityGrams!: string

  @Column({ name: "logged_at", type: "timestamptz" })
  loggedAt!: Date

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date
}
