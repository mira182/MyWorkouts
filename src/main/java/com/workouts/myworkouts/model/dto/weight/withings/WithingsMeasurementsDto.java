package com.workouts.myworkouts.model.dto.weight.withings;

import com.workouts.myworkouts.model.dto.weight.Measurement;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;


@Data
@SuperBuilder
public class WithingsMeasurementsDto extends Measurement {

    private double fatFreeMass;
}
