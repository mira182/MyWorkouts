CREATE TABLE IF NOT EXISTS workout
(
    id      SERIAL PRIMARY KEY,
    date    DATE UNIQUE                               NOT NULL,
    note    TEXT,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    changed TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);