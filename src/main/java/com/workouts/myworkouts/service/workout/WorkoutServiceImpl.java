package com.workouts.myworkouts.service.workout;

import com.workouts.myworkouts.exceptions.WorkoutNotFoundException;
import com.workouts.myworkouts.model.dto.export.WorkoutExerciseExportDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.mapper.WorkoutExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutMapper;
import com.workouts.myworkouts.model.mapper.export.WorkoutExerciseExportMapper;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import com.workouts.myworkouts.repository.workout.WorkoutRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutExerciseMapper workoutExerciseMapper;

    private final WorkoutExerciseExportMapper workoutExerciseExportMapper;

    private final WorkoutMapper workoutMapper;

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto findByDate(@NonNull LocalDate date) {
        return workoutRepository.findByDate(date)
                .map(workoutMapper::entityToDto)
                .orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutDto> findBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutRepository.findWorkoutsBetweenDates(startDate, endDate).stream()
                .map(workoutMapper::entityToDto)
                .toList();
    }

    @Override
    @Transactional
    public WorkoutDto addWorkoutExerciseToWorkout(@NonNull WorkoutDto workoutDto) {
        return workoutMapper.entityToDto(workoutRepository.findByDate(workoutDto.getDate())
                .map(workout -> {
                    workoutDto.getWorkoutExercises().stream()
                            .map(workoutExerciseMapper::dtoToEntity)
                            .forEach(workout::addWorkoutExercise);

                    return workoutRepository.save(workout);
                })
                .orElseGet(() -> workoutRepository.save(workoutMapper.dtoToEntity(workoutDto))));
    }


    @Override
    @Transactional
    public void addWorkoutExerciseToWorkout(long workoutId, @NonNull WorkoutExerciseDto workoutExerciseDto) {
        workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutNotFoundException(workoutId))
                .getWorkoutExercises()
                .add(workoutExerciseRepository.save(workoutExerciseMapper.dtoToEntity(workoutExerciseDto)));
    }

    @Override
    @Transactional
    public void deleteWorkout(long id) {
        workoutRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public long countWorkouts(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutRepository.countAllByDateBetween(startDate, endDate);
    }

    @Override
    public BigDecimal sumWorkoutsVolumeBetweenDates(@NonNull LocalDate startDate, @NonNull LocalDate endDate) {
        return workoutRepository.sumWorkoutsVolumeBetweenDates(startDate, endDate);
    }

    @Override
    @Transactional
    public void importWorkoutExercises(@NonNull WorkoutExerciseExportDto workoutExerciseExportDto) {
        workoutRepository.findByDate(workoutExerciseExportDto.getDate())
                .map(workout -> {
                    workout.addWorkoutExercise(workoutExerciseExportMapper.dtoToEntity(workoutExerciseExportDto));

                    return workoutRepository.save(workout);
                })
                .orElseGet(() -> {
                    Workout workout = new Workout();
                    workout.setDate(workoutExerciseExportDto.getDate());
                    workout.addWorkoutExercise(workoutExerciseExportMapper.dtoToEntity(workoutExerciseExportDto));

                    workoutRepository.save(workout);

                    return workout;
                });
    }
}
