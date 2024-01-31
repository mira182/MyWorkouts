package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import org.mapstruct.AfterMapping;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { WorkoutExerciseMapper.class })
public interface WorkoutMapper {

    WorkoutDto entityToDto(Workout workout);

    Workout dtoToEntity(WorkoutDto workoutDto);
}
