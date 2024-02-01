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

}
