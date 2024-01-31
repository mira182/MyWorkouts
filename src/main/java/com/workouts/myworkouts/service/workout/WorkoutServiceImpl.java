package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.mapper.WorkoutMapper;
import com.workouts.myworkouts.repository.workout.WorkoutRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final WorkoutMapper workoutMapper;

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto findByDate(LocalDate date) {
        return workoutMapper.entityToDto(workoutRepository.findByDate(date)
                .orElseThrow(() -> new WorkoutNotFoundException(date)));
    }

    @Override
    @Transactional
    public WorkoutDto createWorkout(@NonNull WorkoutDto workoutDto) {
        return workoutMapper.entityToDto(workoutRepository.save(workoutMapper.dtoToEntity(workoutDto)));
    }

    @Override
    public void deleteWorkout(long id) {
        workoutRepository.deleteById(id);
    }
}
