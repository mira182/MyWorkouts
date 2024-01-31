CREATE TABLE IF NOT EXISTS workout_exercise
(
    id          SERIAL PRIMARY KEY,
    workout_id  BIGINT,
    exercise_id BIGINT,
    training_id bigint
);