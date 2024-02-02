package com.workouts.myworkouts.service.workout;


import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;

public interface WorkoutExerciseService {

    WorkoutExerciseDto createWorkoutExercise(WorkoutExerciseDto workoutExerciseDto);

    WorkoutExerciseDto updateWorkout(WorkoutExerciseDto workoutExerciseDto);

    void deleteWorkout(Long id);

}
