package com.workouts.myworkouts.service.exercise;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExerciseService {

    List<ExerciseDto> getAllExercises();

    ExerciseDto createExercise(@NonNull ExerciseDto exerciseDto);

    ExerciseDto createExercise(@NonNull ExerciseDto exerciseDto, MultipartFile multipartFile);

    ExerciseDto updateExercise(@NonNull ExerciseDto exerciseDto, long id, MultipartFile file);

    List<ExerciseDto> findAllByCategory(@NonNull ExerciseCategory category);

    void deleteExercise(long id);
}
