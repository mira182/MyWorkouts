package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.enums.MeasurementsProvider;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import lombok.NonNull;

public interface MeasurementRepositoryProvider {

    MeasurementQueryDslRepository provideQueryDslRepository(@NonNull MeasurementsProvider measurementsProvider);
}
