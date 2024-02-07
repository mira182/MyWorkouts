package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
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
public class ChartJSBreakdownChartDataProvider implements BreakdownChartDataProvider<ChartJSDataDto<ChartJSPointDto>> {

    private final ChartService chartService;

    @Override
    public ChartJSDataDto<ChartJSPointDto> provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
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

        return ChartJSDataDto.<ChartJSPointDto>builder()
                .data(data.entrySet().stream()
                        .map(stringDoubleEntry -> ChartJSPointDto.builder()
                                .key(stringDoubleEntry.getKey())
                                .value(BigDecimal.valueOf(stringDoubleEntry.getValue()))
                                .build())
                        .toList())
                .build();
    }
}
