package com.workouts.myworkouts.controller.chart.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.dashboard.NgxChartDataDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
import com.workouts.myworkouts.service.chart.dashboard.provider.totals.TotalsChartDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/dashboard/ngx")
public class NgxDashboardController {

    private final BreakdownChartDataProvider<NgxChartDataDto> ngxBreakdownChartDataProvider;

    private final TotalsChartDataProvider<NgxChartDataDto> totalsChartDataProvider;

    @GetMapping("/breakdownChartData")
    public NgxChartDataDto getBreakdownChartData(@RequestParam BreakdownChartType breakdownChartType,
                                                 @RequestParam BreakdownChartGroup breakdownChartGroup,
                                                 @RequestParam LocalDate startDate,
                                                 @RequestParam LocalDate endDate) {
        return ngxBreakdownChartDataProvider.provideData(breakdownChartType, breakdownChartGroup, startDate, endDate);
    }

    @GetMapping("/totalsChartData")
    public NgxChartDataDto getTotalsChartData(@RequestParam LocalDate startDate,
                                              @RequestParam LocalDate endDate) {
        return totalsChartDataProvider.provideData(startDate, endDate);
    }
}
