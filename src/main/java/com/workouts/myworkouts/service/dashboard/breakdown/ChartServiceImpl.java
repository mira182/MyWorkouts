package com.workouts.myworkouts.service.dashboard.breakdown;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.enums.IntervalType;
import com.workouts.myworkouts.model.mapper.WorkoutMapper;
import com.workouts.myworkouts.service.workout.WorkoutExerciseService;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.function.Function;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
public class ChartServiceImpl implements ChartService {

    private final WorkoutService workoutService;

    private final WorkoutExerciseService workoutExerciseService;

    private final WorkoutMapper workoutMapper;

    @Override
    @Transactional(readOnly = true)
    public Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesByCategoryBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.findBetweenDates(startDate, endDate).stream()
                .flatMap(workout -> workout.getWorkoutExercises().stream())
                .collect(groupingBy(workoutExerciseDto -> workoutExerciseDto.getExercise().getCategory().name(),
                        mapping(Function.identity(), toList())));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, List<WorkoutExerciseDto>> groupWorkoutExercisesByNameBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutService.findBetweenDates(startDate, endDate).stream()
                .flatMap(workout -> workout.getWorkoutExercises().stream())
                .collect(groupingBy(workoutExerciseDto -> workoutExerciseDto.getExercise().getName(),
                        mapping(Function.identity(), toList())));
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

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutsVolumePerDayBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutStatsByMappingFunctionBetweenDates(workoutMapper::workoutVolume, startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> setsPerWorkoutBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutStatsByMappingFunctionBetweenDates(workoutMapper::workoutSetsCount, startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> repsPerWorkoutBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutStatsByMappingFunctionBetweenDates(workoutMapper::workoutRepsCount, startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutsPerIntervalBetweenDates(intervalType, startDate, endDate).entrySet().stream()
                .collect(toMap(Map.Entry::getKey, localDateListEntry -> BigDecimal.valueOf(localDateListEntry.getValue().size()), (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutVolumePerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutsPerIntervalBetweenDates(intervalType, startDate, endDate).entrySet().stream()
                .collect(toMap(Map.Entry::getKey, localDateListEntry -> localDateListEntry.getValue().stream()
                        .map(workoutMapper::workoutVolume)
                        .reduce(BigDecimal.ZERO, BigDecimal::add), (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutSetsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutsPerIntervalBetweenDates(intervalType, startDate, endDate).entrySet().stream()
                .collect(toMap(Map.Entry::getKey, localDateListEntry -> localDateListEntry.getValue().stream()
                        .map(workoutMapper::workoutSetsCount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add), (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutRepsPerIntervalTypeBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return getWorkoutsPerIntervalBetweenDates(intervalType, startDate, endDate).entrySet().stream()
                .collect(toMap(Map.Entry::getKey, localDateListEntry -> localDateListEntry.getValue().stream()
                        .map(workoutMapper::workoutRepsCount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add), (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> workoutExerciseBetweenDates(@NonNull String exerciseName,
                                                                  @NonNull LocalDate startDate,
                                                                  @NonNull LocalDate endDate,
                                                                  @NonNull Function<WorkoutExerciseDto, BigDecimal> mappingFunction) {
        return workoutExerciseService.findByExerciseBetweenDates(exerciseName, startDate, endDate, mappingFunction);
    }

    private Map<LocalDate, BigDecimal> getWorkoutStatsByMappingFunctionBetweenDates(@NonNull Function<WorkoutDto, BigDecimal> mappingFunction,
                                                                                    @NonNull LocalDate startDate,
                                                                                    @NonNull LocalDate endDate) {
        return workoutService.findBetweenDates(startDate, endDate).stream()
                .collect(toMap(WorkoutDto::getDate, mappingFunction, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    private Map<LocalDate, List<WorkoutDto>> getWorkoutsPerIntervalBetweenDates(@NonNull IntervalType intervalType, @NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        final Map<LocalDate, List<WorkoutDto>> result = new HashMap<>();

        // init dates for given date range in result map
        LocalDate temp = LocalDate.from(startDate);
        while (temp.isBefore(YearMonth.of(endDate.getYear(), endDate.getMonth()).atEndOfMonth())) {
            result.put(temp, new ArrayList<>());
            temp = addTimeByRangeType(temp, intervalType);
        }

        // adding workouts to specific dates into result map
        workoutService.findBetweenDates(startDate, endDate).stream()
                .collect(toMap(WorkoutDto::getDate, Function.identity()))
                .forEach((workoutDate, workoutDto) -> result.keySet().forEach(date -> {
                    final LocalDate endOfRange = addTimeByRangeType(date, intervalType);

                    if ((workoutDate.isEqual(date) || workoutDate.isAfter(date)) && workoutDate.isBefore(endOfRange)) {
                        result.get(date).add(workoutDto);
                    }
                }));

        return result;

    }

    private LocalDate addTimeByRangeType(LocalDate date, IntervalType intervalType) {
        return switch (intervalType) {
            case DAY -> date.plusDays(1);
            case WEEK -> date.plusDays(6);
            case MONTH -> date.plusMonths(1);
        };
    }
}
