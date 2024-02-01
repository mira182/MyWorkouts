CREATE TABLE IF NOT EXISTS workout_set
(
    id                  SERIAL PRIMARY KEY,
    distance            INTEGER          NOT NULL,
    duration            INTEGER          NOT NULL,
    reps                INTEGER          NOT NULL,
    weight              DOUBLE PRECISION NOT NULL,
    workout_exercise_id BIGINT
);