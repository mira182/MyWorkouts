package com.workouts.myworkouts.model.entity.workout;

import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
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
    private List<WorkoutSet> workoutSets;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Workout workout;

    public void addWorkoutSet(WorkoutSet workoutSet) {
        if (workoutSets == null) {
            workoutSets = new ArrayList<>();
        }
        workoutSets.add(workoutSet);
        workoutSet.setWorkoutExercise(this);
    }
}
