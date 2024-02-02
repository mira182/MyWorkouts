package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutSetMapper;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutExerciseMapper workoutExerciseMapper;

    private final WorkoutSetMapper workoutSetMapper;

    @Override
    @Transactional
    public WorkoutExerciseDto createWorkoutExercise(WorkoutExerciseDto workoutExerciseDto) {
        log.debug("WorkoutExerciseDto before mapping: {}", workoutExerciseDto);

        final WorkoutExercise workoutExercise = workoutExerciseMapper.dtoToEntity(workoutExerciseDto);

        log.debug("WorkoutExerciseDto after mapping: {}", workoutExercise);

        return workoutExerciseMapper.entityToDto(workoutExerciseRepository.save(workoutExercise));
    }

    @Override
    @Transactional
    public WorkoutExerciseDto updateWorkout(WorkoutExerciseDto workoutExerciseDto) {
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
    public void deleteWorkout(Long id) {
        workoutExerciseRepository.deleteById(id);
    }
}
