package com.workouts.myworkouts.repository.exercise;

import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    Optional<Exercise> findExerciseByName(String name);

    Collection<Exercise> findByCategory(ExerciseCategory category);
}
