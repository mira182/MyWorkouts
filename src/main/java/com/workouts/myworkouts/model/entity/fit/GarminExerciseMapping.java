package com.workouts.myworkouts.model.entity.fit;

import com.workouts.myworkouts.model.entity.exercise.Exercise;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "garmin_exercise_mapping")
public class GarminExerciseMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String garminName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Exercise exercise;
}
