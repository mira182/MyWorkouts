package com.workouts.myworkouts.service.chart.dashboard.provider.breakdown;

import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import lombok.NonNull;

import java.time.LocalDate;

@FunctionalInterface
public interface BreakdownChartDataProvider<T> {

    T provideData(@NonNull BreakdownChartType breakdownChartType, @NonNull BreakdownChartGroup breakdownChartGroup, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

}
