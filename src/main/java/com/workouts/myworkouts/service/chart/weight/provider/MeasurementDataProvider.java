package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProvider;
import lombok.NonNull;

import java.util.List;

public interface MeasurementDataProvider {

    List<SingleMeasurement> provideData(@NonNull MeasurementsProvider measurementsProvider, @NonNull MeasurementType measurementType);

}
