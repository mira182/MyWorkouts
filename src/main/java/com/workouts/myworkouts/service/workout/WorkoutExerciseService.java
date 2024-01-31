package com.workouts.myworkouts.service.workout;


import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public interface WorkoutExerciseService {

    WorkoutExerciseDto createWorkoutExercise(WorkoutExerciseDto workoutExerciseDto);

    WorkoutExerciseDto updateWorkout(Long id, WorkoutExerciseDto workoutExerciseDto);

    void deleteWorkout(Long id);

    void deleteWorkouts(List<Long> id);

    static WorkoutExerciseDto sortWorkoutSets(WorkoutExerciseDto workoutExerciseDto) {
        List<WorkoutSetDto> sets = workoutExerciseDto.getWorkoutSets().stream()
                .sorted((o1, o2) -> (int) (o1.getId() - o2.getId()))
                .collect(Collectors.toList());
        workoutExerciseDto.setWorkoutSets(sets);
        return workoutExerciseDto;
    }
}
