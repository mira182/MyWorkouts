CREATE TABLE IF NOT EXISTS training_exercise
(
    id               SERIAL PRIMARY KEY,
    training_plan_id BIGINT NOT NULL,
    exercise_id      BIGINT NOT NULL,
    position         INTEGER
);

CREATE TABLE IF NOT EXISTS training_set
(
    id                   SERIAL PRIMARY KEY,
    training_exercise_id BIGINT           NOT NULL,
    distance             INTEGER          NOT NULL,
    duration             INTEGER          NOT NULL,
    reps                 INTEGER          NOT NULL,
    weight               DOUBLE PRECISION NOT NULL
);
