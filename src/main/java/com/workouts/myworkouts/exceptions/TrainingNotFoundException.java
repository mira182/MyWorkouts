package com.workouts.myworkouts.exceptions;

public class TrainingNotFoundException extends NotFoundException {

    public TrainingNotFoundException(Long workoutId) {
        super(String.format("Training with id: %s was not found!", workoutId));
    }
}
