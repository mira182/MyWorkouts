package com.workouts.myworkouts.repository.exercise;

import com.workouts.myworkouts.model.entity.picture.Picture;
import com.workouts.myworkouts.model.enums.PictureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PictureRepository extends JpaRepository<Picture, Long> {

    Optional<Picture> findByNameStartingWithIgnoreCaseAndTypeEquals(String name, PictureType type);
}
