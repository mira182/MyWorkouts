package com.workouts.myworkouts.exceptions;

public class ExerciseNotFoundException extends NotFoundException {

    public ExerciseNotFoundException(Long exerciseId) {
        super(String.format("Exercise with id: %s was not found!", exerciseId));
    }

    public ExerciseNotFoundException(String exerciseName) {
        super(String.format("Exercise with name: %s was not found!", exerciseName));
    }
}
