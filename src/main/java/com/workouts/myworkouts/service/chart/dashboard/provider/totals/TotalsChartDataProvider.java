package com.workouts.myworkouts.service.chart.dashboard.provider.totals;

import lombok.NonNull;

import java.time.LocalDate;

@FunctionalInterface
public interface TotalsChartDataProvider<T> {

    T provideData(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

}
