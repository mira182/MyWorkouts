package com.workouts.myworkouts.model.dto.weight.withings;

import com.workouts.myworkouts.model.dto.weight.Measurement;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
public class WithingsMeasurementsDto extends Measurement {

    private double fatFreeMass;
}
