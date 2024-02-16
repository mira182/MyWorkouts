CREATE TABLE IF NOT EXISTS exercise_picture
(
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(512),
    relative_path VARCHAR(2048),
    type          VARCHAR(64),
    exercise_id    BIGINT,
    created       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    changed       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);