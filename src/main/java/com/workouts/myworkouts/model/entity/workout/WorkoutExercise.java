package com.workouts.myworkouts.model.entity.workout;

import com.workouts.myworkouts.model.entity.exercise.Exercise;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "workout_exercise")
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Exercise exercise;

    @OneToMany(mappedBy = "workoutExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkoutSet> workoutSets = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, optional = false)
    private Workout workout;

    public void addWorkoutSet(WorkoutSet workoutSet) {
        workoutSets.add(workoutSet);
        workoutSet.setWorkoutExercise(this);
    }
}
