package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.dashboard.breakdown.ChartService;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@FunctionalInterface
public interface BreakdownChartDataProvider<T> {

    T provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

    default Map<String, Double> getChartDataMap(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate, ChartService chartService) {
        final Map<String, List<WorkoutExerciseDto>> initialData = switch (breakdownChartGroup) {
            case EXERCISE_NAME -> chartService.groupWorkoutExercisesByNameBetweenDates(startDate, endDate);
            case EXERCISE_CATEGORY -> chartService.groupWorkoutExercisesByCategoryBetweenDates(startDate, endDate);
        };

        return switch(breakdownChartType) {
            case WORKOUTS_NUMBER -> initialData.entrySet().stream()
                    .collect(Collectors.toMap(Map.Entry::getKey, entry -> Integer.valueOf(entry.getValue().size()).doubleValue()));
            case WORKOUT_VOLUME -> initialData.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            entry -> entry.getValue().stream()
                                    .flatMap(workout -> workout.getWorkoutSets().stream())
                                    .mapToDouble(set -> set.getReps() * set.getWeight())
                                    .sum()
                    ));
            case REPS_NUMBER -> initialData.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            entry -> entry.getValue().stream()
                                    .flatMap(workout -> workout.getWorkoutSets().stream())
                                    .mapToDouble(WorkoutSetDto::getReps)
                                    .sum()
                    ));
            case SETS_NUMBER -> initialData.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            entry -> entry.getValue().stream()
                                    .mapToDouble(workout -> workout.getWorkoutSets().size())
                                    .sum()
                    ));
        };
    }

}
