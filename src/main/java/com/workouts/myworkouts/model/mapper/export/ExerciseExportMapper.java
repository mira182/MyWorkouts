package com.workouts.myworkouts.model.mapper.export;

import com.workouts.myworkouts.model.dto.export.ExerciseExportDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.mapper.PictureMapper;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = {PictureMapper.class})
public interface ExerciseExportMapper {

    ExerciseExportDto entityToDto(Exercise exercise);

    Exercise dtoToEntity(ExerciseExportDto exerciseDto);
}
