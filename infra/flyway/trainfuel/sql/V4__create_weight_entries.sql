CREATE TABLE weight_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
    weight_kg NUMERIC(5, 2) NOT NULL CHECK (weight_kg > 0),
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

CREATE INDEX idx_weight_entries_logged_at ON weight_entries (logged_at);