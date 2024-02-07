package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface WorkoutService {

    WorkoutDto findByDate(@NonNull LocalDate date);

    List<WorkoutDto> findBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    WorkoutDto addWorkoutExerciseToWorkout(@NonNull WorkoutDto workoutDto);

    void deleteWorkout(long id);

    void addWorkoutExerciseToWorkout(long workoutId, @NonNull WorkoutExerciseDto workoutExerciseDto);

    long countWorkouts(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    BigDecimal sumWorkoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);
}
