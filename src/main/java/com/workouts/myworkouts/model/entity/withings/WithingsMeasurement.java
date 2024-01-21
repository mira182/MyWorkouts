package com.workouts.myworkouts.model.entity.withings;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "withings_measurements")
public class WithingsMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime date;

    private double weight;

    private double fatFreeMass;

    private double fatRatio;

    private double fatMassWeight;

    private double muscleMass;

    private double muscleMassRatio;

    private double hydration;

    private double hydrationRatio;

    private double boneMass;

    private double bmi;
}
