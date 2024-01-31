package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { WorkoutMapper.class })
public interface TrainingMapper {

    TrainingPlan dtoToEntity(TrainingPlanDto trainingDTO);

    @Mapping(target = "workout", ignore = true)
    TrainingPlanDto entityToDtoWithoutWorkouts(TrainingPlan training);

    TrainingPlanDto entityToDtoWithWorkouts(TrainingPlan training);
}
