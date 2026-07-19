CREATE TABLE IF NOT EXISTS garmin_exercise_mapping
(
    id          SERIAL PRIMARY KEY,
    garmin_name VARCHAR(255) NOT NULL UNIQUE,
    exercise_id BIGINT       NOT NULL
);
