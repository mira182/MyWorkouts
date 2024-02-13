package com.workouts.myworkouts.controller.chart.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.model.enums.WorkoutChartType;
import com.workouts.myworkouts.model.enums.WorkoutExerciseChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
import com.workouts.myworkouts.service.chart.dashboard.provider.exercise.WorkoutExerciseChartDataProvider;
import com.workouts.myworkouts.service.chart.dashboard.provider.workout.WorkoutChartDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/dashboard/chartjs")
public class ChartJSDashboardController {

    private final BreakdownChartDataProvider<ChartJSDataDto<ChartJSPointDto>> googleChartBreakdownChartDataProvider;

    private final WorkoutChartDataProvider<ChartJSDataDto<ChartJSPointDto>> workoutChartDataProvider;

    private final WorkoutExerciseChartDataProvider<ChartJSDataDto<ChartJSPointDto>> workoutExerciseChartDataProvider;

    @GetMapping("/breakdownChartData")
    public ChartJSDataDto<ChartJSPointDto> getBreakdownChartData(@RequestParam BreakdownChartType breakdownChartType,
                                                                @RequestParam BreakdownChartGroup breakdownChartGroup,
                                                                @RequestParam LocalDate startDate,
                                                                @RequestParam LocalDate endDate) {
        return googleChartBreakdownChartDataProvider.provideData(breakdownChartType, breakdownChartGroup, startDate, endDate);
    }

    @GetMapping("/workoutChartData")
    public ChartJSDataDto<ChartJSPointDto> getWorkoutChartData(@RequestParam WorkoutChartType workoutChartType,
                                                               @RequestParam LocalDate startDate,
                                                               @RequestParam LocalDate endDate) {
        return workoutChartDataProvider.provideData(workoutChartType, startDate, endDate);
    }

    @GetMapping("/workoutExerciseChartData")
    public ChartJSDataDto<ChartJSPointDto> getWorkoutChartData(@RequestParam String exerciseName,
                                                               @RequestParam WorkoutExerciseChartType workoutExerciseChartType,
                                                               @RequestParam LocalDate startDate,
                                                               @RequestParam LocalDate endDate) {
        return workoutExerciseChartDataProvider.provideData(workoutExerciseChartType, exerciseName, startDate, endDate);
    }
}
