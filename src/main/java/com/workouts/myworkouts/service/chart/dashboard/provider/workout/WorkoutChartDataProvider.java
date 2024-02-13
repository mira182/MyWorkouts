package com.workouts.myworkouts.service.chart.dashboard.provider.workout;

import com.workouts.myworkouts.model.enums.WorkoutChartType;
import lombok.NonNull;

import java.time.LocalDate;

@FunctionalInterface
public interface WorkoutChartDataProvider<T> {

    T provideData(@NonNull WorkoutChartType workoutChartType, @NonNull LocalDate startDate, @NonNull LocalDate endDate);
}
