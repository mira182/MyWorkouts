package com.workouts.myworkouts.service.chart.dashboard.provider.totals.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.NgxChartDataPointDto;
import com.workouts.myworkouts.model.dto.chart.ngx.dashboard.NgxChartDataDto;
import com.workouts.myworkouts.service.chart.dashboard.provider.totals.TotalsChartDataProvider;
import com.workouts.myworkouts.service.dashboard.breakdown.ChartService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NgxTotalsChartDataProvider implements TotalsChartDataProvider<NgxChartDataDto> {

    private final ChartService chartService;
    @Override
    public NgxChartDataDto provideData(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final NgxChartDataPointDto workoutsCount = NgxChartDataPointDto.builder()
                .name("WORKOUTS_COUNT")
                .value(BigDecimal.valueOf(chartService.countWorkoutsBetweenDates(startDate, endDate)))
                .build();

        NgxChartDataPointDto workoutsVolume = NgxChartDataPointDto.builder()
                .name("WORKOUTS_VOLUME")
                .value(chartService.workoutsVolumeBetweenDates(startDate, endDate))
                .build();

        return NgxChartDataDto.builder()
                .data(List.of(workoutsCount, workoutsVolume))
                .build();
    }
}
