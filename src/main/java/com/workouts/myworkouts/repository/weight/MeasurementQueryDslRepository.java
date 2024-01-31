package com.workouts.myworkouts.repository.weight;

import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import lombok.NonNull;

import java.time.LocalDate;
import java.util.List;

public interface MeasurementQueryDslRepository {

    List<SingleMeasurement> findByColumnNameAndDate(@NonNull MeasurementType measurementType);
}
