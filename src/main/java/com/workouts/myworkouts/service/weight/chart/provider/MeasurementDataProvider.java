package com.workouts.myworkouts.service.weight.chart.provider;

import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import lombok.NonNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface MeasurementDataProvider {

    List<SingleMeasurement> provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType);

}
