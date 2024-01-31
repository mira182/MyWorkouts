package com.workouts.myworkouts.service.weight.chart;

import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import lombok.NonNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ChartDataProvider<R> {

    R provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType);
}
