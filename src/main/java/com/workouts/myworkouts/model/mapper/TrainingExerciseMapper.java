package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.training.TrainingExerciseDto;
import com.workouts.myworkouts.model.entity.training.TrainingExercise;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { ExerciseMapper.class, TrainingSetMapper.class })
public interface TrainingExerciseMapper {

    TrainingExerciseDto entityToDto(TrainingExercise trainingExercise);

    TrainingExercise dtoToEntity(TrainingExerciseDto trainingExerciseDto);
}
