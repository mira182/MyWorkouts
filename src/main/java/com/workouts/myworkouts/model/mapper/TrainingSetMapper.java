package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.training.TrainingSetDto;
import com.workouts.myworkouts.model.entity.training.TrainingSet;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrainingSetMapper {

    @InheritInverseConfiguration
    TrainingSetDto entityToDto(TrainingSet trainingSet);

    TrainingSet dtoToEntity(TrainingSetDto trainingSetDto);
}
