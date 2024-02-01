package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import org.mapstruct.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { ExerciseMapper.class, WorkoutSetMapper.class })
public interface WorkoutExerciseMapper {

    WorkoutExerciseDto entityToDto(WorkoutExercise workoutExercise);

    WorkoutExercise dtoToEntity(WorkoutExerciseDto workoutExerciseDto);
}
