package com.workouts.myworkouts.controller.chart.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
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

    @GetMapping("/breakdownChartData")
    public ChartJSDataDto<ChartJSPointDto> getBreakdownChartData(@RequestParam BreakdownChartType breakdownChartType,
                                                                @RequestParam BreakdownChartGroup breakdownChartGroup,
                                                                @RequestParam LocalDate startDate,
                                                                @RequestParam LocalDate endDate) {
        return googleChartBreakdownChartDataProvider.provideData(breakdownChartType, breakdownChartGroup, startDate, endDate);
    }
}
