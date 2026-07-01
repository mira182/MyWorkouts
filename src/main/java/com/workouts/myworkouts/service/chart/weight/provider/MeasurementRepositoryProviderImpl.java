package com.workouts.myworkouts.service.chart.weight.provider;

import com.workouts.myworkouts.model.enums.MeasurementsProvider;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import com.workouts.myworkouts.repository.weight.tanita.TanitaQueryDslRepository;
import com.workouts.myworkouts.repository.weight.withings.WithingsQueryDslRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeasurementRepositoryProviderImpl implements MeasurementRepositoryProvider {

    private final TanitaQueryDslRepository tanitaQueryDslRepository;

    private final WithingsQueryDslRepository withingsQueryDslRepository;

    @Override
    public MeasurementQueryDslRepository provideQueryDslRepository(@NonNull MeasurementsProvider measurementsProvider) {
        return switch(measurementsProvider) {
            case TANITA -> tanitaQueryDslRepository;
            case WITHINGS -> withingsQueryDslRepository;
        };
    }

}
