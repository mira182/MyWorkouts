package com.workouts.myworkouts.model.mapper.export;

import com.workouts.myworkouts.model.dto.export.WorkoutSetExportDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutSet;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WorkoutSetExportMapper {

    @InheritInverseConfiguration
    WorkoutSetExportDto entityToDto(WorkoutSet workoutSet);

    WorkoutSet dtoToEntity(WorkoutSetExportDto workoutSetDto);
}
