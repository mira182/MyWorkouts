package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.chartjs;

import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSDataDto;
import com.workouts.myworkouts.model.dto.chart.chartjs.ChartJSPointDto;
import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.BreakdownChartDataProvider;
import com.workouts.myworkouts.service.dashboard.breakdown.ChartService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChartJSBreakdownChartDataProvider implements BreakdownChartDataProvider<ChartJSDataDto<ChartJSPointDto>> {

    private final ChartService chartService;

    @Override
    public ChartJSDataDto<ChartJSPointDto> provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final Map<String, Double> data = getChartDataMap(breakdownChartType, breakdownChartGroup, startDate, endDate, chartService);

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
