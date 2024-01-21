package com.workouts.myworkouts.model.dto.weight.tanita;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
public class TanitaMeasurementDto {

    private LocalDateTime date;

    private double weight;

    private double bmi;

    private double bodyFatRatio;

    private double bodyFatMass;

    private double muscleMass;

    private double muscleMassRatio;

    private double bodyWatterRatio;

    private double bodyWatterMass;

    private double boneMass;

    private double visceralFat;

    private double muscleQuality;

    private double bmr;

    private double metabolicAge;

    private double physiqueRating;
}
