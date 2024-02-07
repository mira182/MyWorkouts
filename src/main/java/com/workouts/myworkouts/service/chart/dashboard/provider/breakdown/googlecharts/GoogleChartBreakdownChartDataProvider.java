package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.googlecharts;

import com.workouts.myworkouts.model.dto.chart.googlecharts.GoogleChartDataDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
import com.workouts.myworkouts.service.dashboard.breakdown.ChartService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoogleChartBreakdownChartDataProvider implements BreakdownChartDataProvider<GoogleChartDataDto<BigDecimal>> {

    private final ChartService chartService;

    @Override
    public GoogleChartDataDto<BigDecimal> provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final Map<String, List<WorkoutExerciseDto>> initialData = switch (breakdownChartGroup) {
            case EXERCISE_NAME -> chartService.groupWorkoutExercisesBetweenDatesByName(startDate, endDate);
            case EXERCISE_CATEGORY -> chartService.groupWorkoutExercisesBetweenDatesByCategory(startDate, endDate);
        };

        final Map<String, Double> data = switch(breakdownChartType) {
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

        return GoogleChartDataDto.<BigDecimal>builder()
                .data(data.values().stream()
                        .map(BigDecimal::valueOf)
                        .collect(Collectors.toList()))
                .build();
    }
}
