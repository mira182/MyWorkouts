package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { TrainingExerciseMapper.class })
public interface TrainingMapper {

    TrainingPlan dtoToEntity(TrainingPlanDto trainingDTO);

    @Mapping(target = "trainingExercises", ignore = true)
    TrainingPlanDto entityToDtoWithoutExercises(TrainingPlan training);

    TrainingPlanDto entityToDtoWithExercises(TrainingPlan training);
}
