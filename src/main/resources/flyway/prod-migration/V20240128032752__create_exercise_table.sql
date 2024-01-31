CREATE TABLE IF NOT EXISTS exercise
(
    id       SERIAL PRIMARY KEY,
    category VARCHAR(255)                              NOT NULL,
    name     VARCHAR(255)                              NOT NULL,
    type     VARCHAR(255),
    created  TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    changed  TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

