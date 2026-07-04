package com.workouts.myworkouts.repository.training;

import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TrainingRepository extends JpaRepository<TrainingPlan, Long> {

    @Query("""
            SELECT DISTINCT tp FROM TrainingPlan tp
            LEFT JOIN FETCH tp.trainingExercises te
            LEFT JOIN FETCH te.exercise
            WHERE tp.id = :trainingId
            """)
    Optional<TrainingPlan> findTrainingPlanWithWorkoutExercisesFetched(long trainingId);
}
