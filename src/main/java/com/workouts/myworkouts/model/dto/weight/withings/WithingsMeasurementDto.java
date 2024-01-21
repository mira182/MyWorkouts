package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WithingsMeasurementDto {

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

    private double fatFreeMass;
}
