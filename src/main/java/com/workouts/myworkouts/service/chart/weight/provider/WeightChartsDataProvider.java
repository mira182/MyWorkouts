package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import lombok.NonNull;

@FunctionalInterface
public interface WeightChartsDataProvider<R> {

    R provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType);
}
