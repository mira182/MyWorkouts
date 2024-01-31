package com.workouts.myworkouts.service.weight.tanita;


import com.workouts.myworkouts.model.dto.weight.tanita.GenericResponseDto;
import com.workouts.myworkouts.model.dto.weight.tanita.TanitaMeasurementsDto;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import lombok.NonNull;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.List;

public interface TanitaService {

    GenericResponseDto saveWeightReport() throws IOException, GeneralSecurityException;

    List<TanitaMeasurementsDto> getAllMeasurements();

    TanitaMeasurementsDto getMeasurementByDate(LocalDate date);

    List<SingleMeasurement> getMeasurementByType(@NonNull MeasurementType measurementType);
}
