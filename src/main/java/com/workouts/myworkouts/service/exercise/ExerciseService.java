package com.workouts.myworkouts.service.exercise;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExerciseService {

    List<ExerciseDto> getAllExercises();

    ExerciseDto createExercise(ExerciseDto exerciseDto);

    ExerciseDto createExercise(ExerciseDto exerciseDto, MultipartFile multipartFile);

    ExerciseDto updateExercise(ExerciseDto exerciseDto, Long id, MultipartFile file);

    List<ExerciseDto> findAllByCategory(ExerciseCategory category);

    boolean deleteExercise(Long id);
}
