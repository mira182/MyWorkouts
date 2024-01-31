CREATE TABLE IF NOT EXISTS training_plan
(
    id            SERIAL PRIMARY KEY,
    is_applied    BOOLEAN NOT NULL,
    name          VARCHAR(255),
    scheduled     BOOLEAN NOT NULL,
    start_date    DATE,
    training_day  VARCHAR(255),
    training_time TIME,
    workout_id    BIGINT
);