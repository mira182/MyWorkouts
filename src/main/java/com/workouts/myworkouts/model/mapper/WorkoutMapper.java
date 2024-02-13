package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { WorkoutExerciseMapper.class })
public interface WorkoutMapper {

    WorkoutDto entityToDto(Workout workout);

    Workout dtoToEntity(WorkoutDto workoutDto);

    default BigDecimal workoutVolume(WorkoutDto workoutDto) {
        return workoutDto.getWorkoutExercises().stream()
                .map(WorkoutExerciseDto::getWorkoutSets)
                .flatMap(Collection::stream)
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getReps() * workoutSet.getWeight()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    default BigDecimal workoutSetsCount(WorkoutDto workoutDto) {
        return BigDecimal.valueOf(workoutDto.getWorkoutExercises().stream()
                .map(WorkoutExerciseDto::getWorkoutSets)
                .map(List::size).count());
    }

    default BigDecimal workoutRepsCount(WorkoutDto workoutDto) {
        return workoutDto.getWorkoutExercises().stream()
                .map(WorkoutExerciseDto::getWorkoutSets)
                .flatMap(Collection::stream)
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getReps()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
