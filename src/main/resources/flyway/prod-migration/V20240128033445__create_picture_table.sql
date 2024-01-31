CREATE TABLE IF NOT EXISTS pictures
(
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(512),
    relative_path VARCHAR(2048),
    type          VARCHAR(64),
    created       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    changed       TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_pictures
(
    exercise_id BIGINT,
    picture_id  BIGINT,
    FOREIGN KEY (picture_id) REFERENCES pictures (id),
    FOREIGN KEY (exercise_id) REFERENCES exercise (id)
);