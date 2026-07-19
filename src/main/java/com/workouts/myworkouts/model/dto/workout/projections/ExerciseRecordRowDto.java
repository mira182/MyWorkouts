package com.workouts.myworkouts.model.dto.workout.projections;

import com.workouts.myworkouts.model.enums.ExerciseCategory;

import java.time.LocalDate;

public record ExerciseRecordRowDto(Long exerciseId,
                                   String exerciseName,
                                   ExerciseCategory category,
                                   LocalDate date,
                                   double weight,
                                   int reps) {
}
