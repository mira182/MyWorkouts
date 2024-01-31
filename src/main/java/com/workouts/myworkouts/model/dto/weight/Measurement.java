package com.workouts.myworkouts.model.dto.weight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
public class Measurement {

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

}
