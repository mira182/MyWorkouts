package com.workouts.myworkouts.service.workout;


import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.function.Function;

public interface WorkoutExerciseService {

    Map<LocalDate, BigDecimal> findByExerciseBetweenDates(@NonNull String exerciseName,
                                                          @NonNull LocalDate startDate,
                                                          @NonNull LocalDate endDate,
                                                          @NonNull Function<WorkoutExerciseDto, BigDecimal> mappingFunction);

    WorkoutExerciseDto updateWorkout(@NonNull WorkoutExerciseDto workoutExerciseDto);

    void deleteWorkoutExercise(long id);

}
