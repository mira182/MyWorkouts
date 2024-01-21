package com.workouts.myworkouts.service.weight.tanita;


import com.workouts.myworkouts.model.dto.weight.tanita.GenericResponseDto;
import com.workouts.myworkouts.model.dto.weight.tanita.TanitaMeasurementDto;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

public interface TanitaService {

    GenericResponseDto saveWeightReport() throws IOException, GeneralSecurityException;

    List<TanitaMeasurementDto> getAllMeasurements();
}
