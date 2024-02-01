package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import lombok.NonNull;

import java.time.LocalDate;

public interface WorkoutService {

    WorkoutDto findByDate(@NonNull LocalDate date);

    WorkoutDto createWorkout(@NonNull WorkoutDto workoutDto);

    void deleteWorkout(long id);

    void addWorkoutExerciseToWorkout(long workoutId, @NonNull WorkoutExerciseDto workoutExerciseDto);
}
