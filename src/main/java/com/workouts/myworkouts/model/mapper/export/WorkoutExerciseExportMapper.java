package com.workouts.myworkouts.model.mapper.export;

import com.workouts.myworkouts.exceptions.ExerciseNotFoundException;
import com.workouts.myworkouts.model.dto.export.WorkoutExerciseExportDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import com.workouts.myworkouts.repository.exercise.ExerciseRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = {WorkoutSetExportMapper.class})
public abstract class WorkoutExerciseExportMapper {

    @Autowired
    private ExerciseRepository exerciseRepository;

    public abstract WorkoutExerciseExportDto entityToDto(WorkoutExercise workoutExercise);

    @Mapping(target = "exercise", ignore = true)
    public abstract WorkoutExercise dtoToEntity(WorkoutExerciseExportDto workoutExerciseDto);

    @AfterMapping
    public void setUpExercise(@MappingTarget WorkoutExercise workoutExercise, WorkoutExerciseExportDto workoutExerciseDto) {
        final String exerciseName = workoutExerciseDto.getExercise().getName();
        workoutExercise.setExercise(exerciseRepository.findExerciseByName(exerciseName)
                .orElseThrow(() -> new ExerciseNotFoundException(exerciseName)));
    }
}
