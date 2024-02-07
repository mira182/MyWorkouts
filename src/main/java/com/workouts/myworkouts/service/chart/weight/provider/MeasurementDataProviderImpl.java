package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeasurementDataProviderImpl implements MeasurementDataProvider {

    private final MeasurementRepositoryProvider measurementRepositoryProvider;

    @Override
    public List<SingleMeasurement> provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType) {
        final MeasurementQueryDslRepository measurementQueryDslRepository = measurementRepositoryProvider.provideQueryDslRepository(measurementsProviderType);

        return switch (measurementType) {
            case WEIGHT -> measurementQueryDslRepository.findByColumnNameAndDate(measurementType);
        };
    }
}
