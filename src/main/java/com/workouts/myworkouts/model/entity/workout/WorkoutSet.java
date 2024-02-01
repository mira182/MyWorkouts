package com.workouts.myworkouts.model.entity.workout;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "workout_set")
public class WorkoutSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int reps;

    private double weight;

    private int duration;

    private int distance;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private WorkoutExercise workoutExercise;
}
