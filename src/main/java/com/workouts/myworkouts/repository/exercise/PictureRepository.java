package com.workouts.myworkouts.repository.exercise;

import com.workouts.myworkouts.model.entity.picture.ExercisePicture;
import com.workouts.myworkouts.model.enums.PictureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PictureRepository extends JpaRepository<ExercisePicture, Long> {

    Optional<ExercisePicture> findByNameStartingWithIgnoreCaseAndTypeEquals(String name, PictureType type);
}
