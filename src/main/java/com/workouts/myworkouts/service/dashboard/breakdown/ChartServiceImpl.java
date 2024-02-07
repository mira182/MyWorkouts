package com.workouts.myworkouts.service.dashboard.breakdown;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ChartServiceImpl implements ChartService {

    private final WorkoutService workoutService;

    @Override
    @Transactional(readOnly = true)
    public Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesBetweenDatesByCategory(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.findBetweenDates(startDate, endDate).stream()
                .flatMap(workout -> workout.getWorkoutExercises().stream())
                .collect(groupingBy(workoutExerciseDto -> workoutExerciseDto.getExercise().getCategory().name(),
                        Collectors.mapping(Function.identity(), toList())));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesBetweenDatesByName(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.findBetweenDates(startDate, endDate).stream()
                .flatMap(workout -> workout.getWorkoutExercises().stream())
                .collect(groupingBy(workoutExerciseDto -> workoutExerciseDto.getExercise().getName(),
                        Collectors.mapping(Function.identity(), toList())));
    }

    @Override
    @Transactional(readOnly = true)
    public long countWorkoutsBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.countWorkouts(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public BigDecimal workoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.sumWorkoutsVolumeBetweenDates(startDate, endDate);
    }
}
