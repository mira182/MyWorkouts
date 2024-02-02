package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutMapper;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import com.workouts.myworkouts.repository.workout.WorkoutRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutExerciseMapper workoutExerciseMapper;

    private final WorkoutMapper workoutMapper;

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto findByDate(@NonNull LocalDate date) {
        return workoutRepository.findByDate(date)
                .map(workoutMapper::entityToDto)
                .orElse(null);

    }

    @Override
    @Transactional
    public WorkoutDto createWorkout(@NonNull WorkoutDto workoutDto) {
        Optional<Workout> workout = workoutRepository.findByDate(workoutDto.getDate());

        if (workout.isPresent()) {
            return workoutMapper.entityToDto(workout.get());
        }

        return workoutMapper.entityToDto(workoutRepository.save(workoutMapper.dtoToEntity(workoutDto)));
    }


    @Override
    @Transactional
    public void addWorkoutExerciseToWorkout(long workoutId, @NonNull WorkoutExerciseDto workoutExerciseDto) {
        workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutId))
                .getExercises()
                .add(workoutExerciseRepository.save(workoutExerciseMapper.dtoToEntity(workoutExerciseDto)));
    }

    @Override
    @Transactional
    public void deleteWorkout(long id) {
        workoutRepository.deleteById(id);
    }
}
