package com.workouts.myworkouts.repository.fit;

import com.workouts.myworkouts.model.entity.fit.GarminExerciseMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GarminExerciseMappingRepository extends JpaRepository<GarminExerciseMapping, Long> {

    Optional<GarminExerciseMapping> findByGarminName(String garminName);
}
