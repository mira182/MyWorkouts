package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import jakarta.persistence.EntityManager;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeforeMapping;
import org.mapstruct.MappingTarget;

public class JpaContext {

    private final EntityManager em;

    private Workout workout;

    public JpaContext(EntityManager em) {
        this.em = em;
    }

    @BeforeMapping
    public void setEntity(@MappingTarget Workout workout) {
        this.workout = workout;
    }

    @AfterMapping
    public void establishRelation(@MappingTarget WorkoutExercise workoutExercise) {
        workoutExercise.setWorkout(workout);
    }

}
