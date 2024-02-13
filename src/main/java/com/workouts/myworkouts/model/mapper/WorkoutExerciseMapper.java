package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

import java.math.BigDecimal;

@Mapper(componentModel = "spring", collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED, uses = { ExerciseMapper.class, WorkoutSetMapper.class })
public interface WorkoutExerciseMapper {

    WorkoutExerciseDto entityToDto(WorkoutExercise workoutExercise);

    WorkoutExercise dtoToEntity(WorkoutExerciseDto workoutExerciseDto);

    default BigDecimal workoutExerciseRepsMax(WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getReps()))
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
    }

    default BigDecimal workoutExerciseWeightMax(WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getWeight()))
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
    }

    default BigDecimal workoutExerciseVolumeMax(WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getWeight() * workoutSet.getReps()))
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
    }

    default BigDecimal workoutExerciseReps(WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getReps()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    default BigDecimal workoutExerciseVolume(WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSet -> BigDecimal.valueOf(workoutSet.getReps() * workoutSet.getWeight()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
