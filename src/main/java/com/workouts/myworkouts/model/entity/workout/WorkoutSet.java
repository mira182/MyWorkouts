package com.workouts.myworkouts.model.entity.workout;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "workout_sets")
public class WorkoutSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int reps;

    private double weight;

    private int duration;

    private int distance;

    @ManyToOne(fetch = FetchType.LAZY)
    private WorkoutExercise workoutExercise;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkoutSet that = (WorkoutSet) o;
        return reps == that.reps &&
                Double.compare(that.weight, weight) == 0 &&
                duration == that.duration &&
                distance == that.distance &&
                id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, reps, weight, duration, distance);
    }
}
