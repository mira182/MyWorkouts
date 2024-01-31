package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import com.workouts.myworkouts.model.entity.workout.WorkoutSet;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutSetMapper;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public WorkoutExerciseDto updateWorkout(Long id, WorkoutExerciseDto workoutExerciseDto) {
        final WorkoutExercise workoutExercise = workoutExerciseRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFoundException(id));

        updateWorkoutSets(workoutExercise, workoutExerciseDto.getWorkoutSets());
        return workoutExerciseMapper.entityToDto(workoutExercise);
    }

    private void updateWorkoutSets(WorkoutExercise workoutExercise, List<WorkoutSetDto> workoutSetDtos) {
        // update existing sets
        workoutSetDtos.forEach(workoutSetDto -> {
            Optional<WorkoutSet> workoutSetToEdit = workoutExercise.getWorkoutSets().stream()
                    .filter(workoutSet -> workoutSet.getId().equals(workoutSetDto.getId()))
                    .findFirst();
            if (workoutSetToEdit.isPresent()) {
                workoutSetToEdit.get().setReps(workoutSetDto.getReps());
                workoutSetToEdit.get().setWeight(workoutSetDto.getWeight());
                workoutSetToEdit.get().setDistance(workoutSetDto.getDistance());
                workoutSetToEdit.get().setDuration(workoutSetDto.getDuration());
            }
        });

        // remove deleted sets
        final List<WorkoutSet> receivedWorkoutSets = workoutSetDtos.stream()
                .map(workoutSetMapper::dtoToEntity)
                .collect(Collectors.toList());
        workoutExercise.getWorkoutSets().retainAll(receivedWorkoutSets);

        // create new sets
        final List<WorkoutSet> newWorkouts = receivedWorkoutSets.stream()
                .filter(workoutSet -> workoutSet.getId() == null)
                .toList();
        newWorkouts.forEach(workoutExercise::addWorkoutSet);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteWorkout(Long id) {
        workoutExerciseRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteWorkouts(List<Long> workoutIds) {
        workoutIds.forEach(this::deleteWorkout);
    }
}
