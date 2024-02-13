package com.workouts.myworkouts.service.chart.dashboard.provider.workout.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
import com.workouts.myworkouts.model.enums.IntervalType;
import com.workouts.myworkouts.model.enums.WorkoutChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.workout.WorkoutChartDataProvider;
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
public class ChartJsWorkoutChartDataProvider implements WorkoutChartDataProvider<ChartJSDataDto<ChartJSPointDto>> {

    private final ChartService chartService;

    @Override
    public ChartJSDataDto<ChartJSPointDto> provideData(@NonNull WorkoutChartType workoutChartType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {

        final Map<LocalDate, BigDecimal> data = switch (workoutChartType) {
            case VOLUME_PER_WORKOUT -> chartService.workoutsVolumePerDayBetweenDates(startDate, endDate);
            case SETS_PER_WORKOUT -> chartService.setsPerWorkoutBetweenDates(startDate, endDate);
            case REPS_PER_WORKOUT -> chartService.repsPerWorkoutBetweenDates(startDate, endDate);
            case WORKOUTS_PER_WEEK -> chartService.workoutsPerIntervalTypeBetweenDates(IntervalType.WEEK, startDate, endDate);
            case VOLUME_PER_WEEK -> chartService.workoutVolumePerIntervalTypeBetweenDates(IntervalType.WEEK, startDate, endDate);
            case SETS_PER_WEEK -> chartService.workoutSetsPerIntervalTypeBetweenDates(IntervalType.WEEK, startDate, endDate);
            case REPS_PER_WEEK -> chartService.workoutRepsPerIntervalTypeBetweenDates(IntervalType.WEEK, startDate, endDate);
            case WORKOUTS_PER_MONTH -> chartService.workoutsPerIntervalTypeBetweenDates(IntervalType.MONTH, startDate, endDate);
            case VOLUME_PER_MONTH -> chartService.workoutVolumePerIntervalTypeBetweenDates(IntervalType.MONTH, startDate, endDate);
            case SETS_PER_MONTH -> chartService.workoutSetsPerIntervalTypeBetweenDates(IntervalType.MONTH, startDate, endDate);
            case REPS_PER_MONTH -> chartService.workoutRepsPerIntervalTypeBetweenDates(IntervalType.MONTH, startDate, endDate);
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
