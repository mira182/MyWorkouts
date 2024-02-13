package com.workouts.myworkouts.service.chart.dashboard.provider.exercise.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
import com.workouts.myworkouts.model.enums.WorkoutExerciseChartType;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.service.chart.dashboard.provider.exercise.WorkoutExerciseChartDataProvider;
import com.workouts.myworkouts.service.dashboard.breakdown.ChartService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChartJsWorkoutExerciseChartDataProvider implements WorkoutExerciseChartDataProvider<ChartJSDataDto<ChartJSPointDto>> {

    private final ChartService chartService;

    private final WorkoutExerciseMapper workoutExerciseMapper;

    @Override
    public ChartJSDataDto<ChartJSPointDto> provideData(@NonNull WorkoutExerciseChartType workoutExerciseChartType,
                                                       @NonNull String exerciseName,
                                                       @NonNull LocalDate startDate,
                                                       @NonNull LocalDate endDate) {

        final Map<LocalDate, BigDecimal> data = switch(workoutExerciseChartType) {
            case MAX_REPS -> chartService.workoutExerciseBetweenDates(exerciseName, startDate, endDate, workoutExerciseMapper::workoutExerciseRepsMax);
            case MAX_WEIGHT -> chartService.workoutExerciseBetweenDates(exerciseName, startDate, endDate, workoutExerciseMapper::workoutExerciseWeightMax);
            case MAX_VOLUME -> chartService.workoutExerciseBetweenDates(exerciseName, startDate, endDate, workoutExerciseMapper::workoutExerciseVolumeMax);
            case WORKOUT_REPS -> chartService.workoutExerciseBetweenDates(exerciseName, startDate, endDate, workoutExerciseMapper::workoutExerciseReps);
            case WORKOUT_VOLUME -> chartService.workoutExerciseBetweenDates(exerciseName, startDate, endDate, workoutExerciseMapper::workoutExerciseVolume);
        };

        return ChartJSDataDto.<ChartJSPointDto>builder()
                .data(data.entrySet().stream()
                        .map(localDateIntegerEntry -> ChartJSPointDto.builder()
                                .key(localDateIntegerEntry.getKey().format(DateTimeFormatter.ISO_DATE))
                                .value(localDateIntegerEntry.getValue())
                                .build())
                        .toList())
                .build();
    }
}
