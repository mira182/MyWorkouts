package com.workouts.myworkouts.model.dto.exercise;

import java.time.LocalDate;

public record ExerciseRecordDto(Long exerciseId,
                                String exerciseName,
                                String category,
                                double maxWeight,
                                LocalDate maxWeightDate,
                                int maxReps,
                                double estimatedOneRepMax,
                                LocalDate lastPerformed) {
}
