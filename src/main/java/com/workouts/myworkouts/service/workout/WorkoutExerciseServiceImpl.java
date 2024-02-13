package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.projections.WorkoutExerciseDateDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutSetMapper;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;

import static java.util.stream.Collectors.toMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutExerciseMapper workoutExerciseMapper;

    private final WorkoutSetMapper workoutSetMapper;

    @Override
    @Transactional(readOnly = true)
    public Map<LocalDate, BigDecimal> findByExerciseBetweenDates(@NonNull String exerciseName,
                                                                         @NonNull LocalDate startDate,
                                                                         @NonNull LocalDate endDate,
                                                                         @NonNull Function<WorkoutExerciseDto, BigDecimal> mappingFunction) {
        return workoutExerciseRepository.findByExerciseBetweenWorkoutDate(exerciseName, startDate, endDate).stream()
                .collect(toMap(WorkoutExerciseDateDto::getDate, workoutExercise -> mappingFunction.apply(workoutExerciseMapper.entityToDto(workoutExercise.getWorkoutExercise())), (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    @Override
    @Transactional
    public WorkoutExerciseDto updateWorkout(@NonNull WorkoutExerciseDto workoutExerciseDto) {
        final long workoutExerciseId = workoutExerciseDto.getId();

        final WorkoutExercise workoutExercise = workoutExerciseRepository.findById(workoutExerciseId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutExerciseId));

        workoutExercise.getWorkoutSets().clear();

        workoutExerciseDto.getWorkoutSets().stream()
                .map(workoutSetMapper::dtoToEntity)
                .forEach(workoutExercise::addWorkoutSet);

        return workoutExerciseMapper.entityToDto(workoutExerciseRepository.save(workoutExercise));
    }

    @Override
    @Transactional
    public void deleteWorkout(long id) {
        workoutExerciseRepository.deleteById(id);
    }
}
