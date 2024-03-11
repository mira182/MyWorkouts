package com.workouts.myworkouts.exceptions;

public class WorkoutExerciseNotFoundException extends NotFoundException {

    public WorkoutExerciseNotFoundException(Long workoutId) {
        super(String.format("Workout exercise with id: %s was not found!", workoutId));
    }
}
