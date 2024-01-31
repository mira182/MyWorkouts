package com.workouts.myworkouts.service.weight.withings;


import com.workouts.myworkouts.model.dto.weight.withings.MeasureBodyDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementsDto;

import java.time.LocalDate;
import java.util.List;

public interface WithingsService {

    void saveMeasurements(MeasureBodyDto measureBodyDto);

    List<WithingsMeasurementsDto> getMeasurements();

    WithingsMeasurementsDto getMeasurementByDate(LocalDate date);
}
