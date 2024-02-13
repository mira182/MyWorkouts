package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown.googlecharts;

import com.workouts.myworkouts.model.dto.chart.googlecharts.GoogleChartDataDto;
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
public class GoogleChartBreakdownChartDataProvider implements BreakdownChartDataProvider<GoogleChartDataDto<BigDecimal>> {

    private final ChartService chartService;

    @Override
    public GoogleChartDataDto<BigDecimal> provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final Map<String, Double> data = getChartDataMap(breakdownChartType, breakdownChartGroup, startDate, endDate, chartService);

        return GoogleChartDataDto.<BigDecimal>builder()
                .data(data.values().stream()
                        .map(BigDecimal::valueOf)
                        .collect(Collectors.toList()))
                .build();
    }
}
