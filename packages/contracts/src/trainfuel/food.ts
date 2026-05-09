import {z} from 'zod';

export const FoodSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    calories: z.number().nonnegative(),
    carbohydrates: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
});

export const CreateFoodSchema = FoodSchema.omit({id: true});

export type Food = z.infer<typeof FoodSchema>;
export type CreateFood = z.infer<typeof CreateFoodSchema>;