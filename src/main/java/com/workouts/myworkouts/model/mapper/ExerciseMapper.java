package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { PictureMapper.class })
public interface ExerciseMapper {

    ExerciseDto entityToDto(Exercise exercise);

    Exercise dtoToEntity(ExerciseDto exerciseDto);
}
