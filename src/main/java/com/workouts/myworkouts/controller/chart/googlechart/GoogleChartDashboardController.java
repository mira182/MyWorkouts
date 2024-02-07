package com.workouts.myworkouts.controller.chart.googlechart;

import com.workouts.myworkouts.model.dto.chart.googlecharts.GoogleChartDataDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/dashboard/googlechart")
public class GoogleChartDashboardController {

    private final BreakdownChartDataProvider<GoogleChartDataDto<BigDecimal>> googleChartBreakdownChartDataProvider;

    @GetMapping("/breakdownChartData")
    public GoogleChartDataDto<BigDecimal> getBreakdownChartData(@RequestParam BreakdownChartType breakdownChartType,
                                                                        @RequestParam BreakdownChartGroup breakdownChartGroup,
                                                                        @RequestParam LocalDate startDate,
                                                                        @RequestParam LocalDate endDate) {
        return googleChartBreakdownChartDataProvider.provideData(breakdownChartType, breakdownChartGroup, startDate, endDate);
    }
}
