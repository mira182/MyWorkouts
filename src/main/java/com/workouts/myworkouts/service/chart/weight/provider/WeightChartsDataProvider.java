package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProvider;
import lombok.NonNull;

@FunctionalInterface
public interface WeightChartsDataProvider<R> {

    R provideData(@NonNull MeasurementsProvider measurementsProvider, @NonNull MeasurementType measurementType);
}
