package com.workouts.myworkouts.model.dto.weight.tanita;

import com.workouts.myworkouts.model.dto.weight.Measurement;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
public class TanitaMeasurementsDto extends Measurement {

    private double bodyWatterMass;

    private double visceralFat;

    private double muscleQuality;

    private double bmr;

    private double metabolicAge;

    private double physiqueRating;
}
