package com.workouts.myworkouts.service.chart.dashboard.provider.exercise;

import com.workouts.myworkouts.model.enums.WorkoutExerciseChartType;
import lombok.NonNull;

import java.time.LocalDate;

@FunctionalInterface
public interface WorkoutExerciseChartDataProvider<T> {

    T provideData(@NonNull WorkoutExerciseChartType workoutExerciseChartType, @NonNull String exerciseName,  @NonNull LocalDate startDate, @NonNull LocalDate endDate);
}
