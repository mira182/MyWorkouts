INSERT INTO exercise (category, name, type)
VALUES ('CHEST', 'Flat Barbell Bench Press', 'WEIGHTED_REPS'),
       ('CHEST', 'Incline Barbell Bench Press', 'WEIGHTED_REPS'),
       ('CHEST', 'Decline Barbell Bench Press', 'WEIGHTED_REPS'),
       ('CHEST', 'Dumbbell Bench Press', 'WEIGHTED_REPS'),
       ('CHEST', 'Incline Dumbbell Bench Press', 'WEIGHTED_REPS'),
       ('CHEST', 'Flat Dumbbell Fly', 'WEIGHTED_REPS'),
       ('CHEST', 'Incline Dumbbell Fly', 'WEIGHTED_REPS'),
       ('CHEST', 'Push Up', 'REPS') ON CONFLICT DO NOTHING;
