CREATE TABLE IF NOT EXISTS workout_exercise
(
    id          SERIAL PRIMARY KEY,
    workout_id  BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    training_id BIGINT
);