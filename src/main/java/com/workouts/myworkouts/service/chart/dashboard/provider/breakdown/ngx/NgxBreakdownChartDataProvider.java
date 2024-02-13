package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.NgxChartDataPointDto;
import com.workouts.myworkouts.model.dto.chart.ngx.dashboard.NgxChartDataDto;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NgxBreakdownChartDataProvider implements BreakdownChartDataProvider<NgxChartDataDto> {

    private final ChartService chartService;

    @Override
    public NgxChartDataDto provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final Map<String, Double> data = getChartDataMap(breakdownChartType, breakdownChartGroup, startDate, endDate, chartService);

        return NgxChartDataDto.builder()
                .data(data.entrySet().stream()
                        .map(stringDoubleEntry -> NgxChartDataPointDto.builder()
                                .name(stringDoubleEntry.getKey())
                                .value(BigDecimal.valueOf(stringDoubleEntry.getValue()))
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
