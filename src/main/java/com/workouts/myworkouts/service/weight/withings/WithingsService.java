package com.workouts.myworkouts.service.weight.withings;


import com.workouts.myworkouts.model.dto.weight.withings.MeasureBodyDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementDto;

import java.util.List;

public interface WithingsService {

    void saveMeasurements(MeasureBodyDto measureBodyDto);

    List<WithingsMeasurementDto> getMeasurements();
}
