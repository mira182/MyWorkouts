package com.workouts.myworkouts.service.dashboard.breakdown;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ChartService {

    Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesBetweenDatesByCategory(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesBetweenDatesByName(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    long countWorkoutsBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    BigDecimal workoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

}
