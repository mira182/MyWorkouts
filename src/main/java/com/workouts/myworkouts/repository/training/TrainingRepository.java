package com.workouts.myworkouts.repository.training;

import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;

public interface TrainingRepository extends JpaRepository<TrainingPlan, Long> {

    @Query("""
            SELECT tp FROM TrainingPlan tp
            JOIN FETCH WorkoutExercise we
            WHERE tp.id = :trainingId
            """)
    Optional<TrainingPlan> findTrainingPlanWithWorkoutExercisesFetched(long trainingId);
}
