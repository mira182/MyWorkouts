package com.workouts.myworkouts.service.weight.chart.provider;

import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import lombok.NonNull;

public interface MeasurementRepositoryProvider {

    MeasurementQueryDslRepository provideQueryDslRepository(@NonNull MeasurementsProviderType measurementsProviderType);
}
