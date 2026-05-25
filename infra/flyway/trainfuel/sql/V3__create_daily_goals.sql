CREATE TABLE daily_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calories INTEGER NOT NULL CHECK (calories >= 0),
    protein NUMERIC(8, 2) NOT NULL CHECK (protein >= 0),
    carbs NUMERIC(8, 2) NOT NULL CHECK (carbs >= 0),
    fat NUMERIC(8, 2) NOT NULL CHECK (fat >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);