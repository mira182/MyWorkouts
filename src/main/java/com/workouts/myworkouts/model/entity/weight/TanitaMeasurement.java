package com.workouts.myworkouts.model.entity.weight;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tanita_measurement")
public class TanitaMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    private double weight;

    private double bmi;

    private double bodyFat;

    private double bodyFatMass;

    private double visceralFat;

    private double muscleMass;

    private double muscleMassRatio;

    private double muscleQuality;

    private double boneMass;

    private double bmr;

    private double metabolicAge;

    private double bodyWatter;

    private double bodyWatterMass;

    private double physiqueRating;
}
