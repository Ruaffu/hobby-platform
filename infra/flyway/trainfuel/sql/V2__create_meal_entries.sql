CREATE TABLE meal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  food_id UUID NOT NULL REFERENCES foods(id) ON DELETE CASCADE,

  meal_type TEXT NOT NULL CHECK (
    meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')
  ),

  quantity_grams NUMERIC(8, 2) NOT NULL CHECK (quantity_grams > 0),

  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meal_entries_logged_at ON meal_entries(logged_at);
CREATE INDEX idx_meal_entries_food_id ON meal_entries(food_id);