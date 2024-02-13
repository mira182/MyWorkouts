package com.workouts.myworkouts.service.dashboard.breakdown;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.enums.IntervalType;
import lombok.NonNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public interface ChartService {

    Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesByCategoryBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesByNameBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    long countWorkoutsBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    BigDecimal workoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutsVolumePerDayBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> setsPerWorkoutBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> repsPerWorkoutBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutVolumePerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutSetsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutRepsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate);

    Map<LocalDate, BigDecimal> workoutExerciseBetweenDates(@NonNull String exerciseName,
                                                           @NonNull LocalDate startDate,
                                                           @NonNull LocalDate endDate,
                                                           @NonNull Function<WorkoutExerciseDto, BigDecimal> mappingFunction);

}
