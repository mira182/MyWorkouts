package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutSet;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WorkoutSetMapper {

    @InheritInverseConfiguration
    WorkoutSetDto entityToDto(WorkoutSet workoutSet);

    WorkoutSet dtoToEntity(WorkoutSetDto workoutSetDto);
}
