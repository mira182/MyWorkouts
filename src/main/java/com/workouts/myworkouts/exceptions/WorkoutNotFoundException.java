package com.workouts.myworkouts.exceptions;

import java.time.LocalDate;

public class WorkoutNotFoundException extends NotFoundException {

    public WorkoutNotFoundException(Long workoutId) {
        super(String.format("Workout with id: %s was not found!", workoutId));
    }

    public WorkoutNotFoundException(LocalDate date) {
        super(String.format("Workout for date: %s was not found!", date.toString()));
    }
}
