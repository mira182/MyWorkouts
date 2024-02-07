package com.workouts.myworkouts.service.training;

import com.workouts.myworkouts.exceptions.TrainingNotFoundException;
import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.model.mapper.TrainingMapper;
import com.workouts.myworkouts.model.mapper.WorkoutMapper;
import com.workouts.myworkouts.repository.training.TrainingRepository;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TrainingServiceImpl implements TrainingService {

    private final TrainingRepository trainingRepository;

    private final TrainingMapper trainingMapper;

    private final WorkoutMapper workoutMapper;

    private final WorkoutService workoutService;

    @Override
    @Transactional
    public TrainingPlanDto createTraining(TrainingPlanDto trainingDTO) {
        return trainingMapper.entityToDtoWithWorkouts(trainingRepository.save(trainingMapper.dtoToEntity(trainingDTO)));
    }

    @Override
    @Transactional
    public List<TrainingPlanDto> getAllTrainings() {
        return trainingRepository.findAll().stream()
                .map(trainingMapper::entityToDtoWithoutWorkouts)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TrainingPlanDto getTrainingWithFetchedWorkoutExercise(long trainingId) {
        return trainingMapper.entityToDtoWithWorkouts(
                trainingRepository.findTrainingPlanWithWorkoutExercisesFetched(trainingId)
                        .orElseThrow(() -> new TrainingNotFoundException(trainingId)));
    }

    @Override
    @Transactional(readOnly = true)
    public WorkoutDto getWorkoutForTraining(long trainingId) {
        return workoutMapper.entityToDto(trainingRepository.findById(trainingId)
                .orElseThrow(() -> new TrainingNotFoundException(trainingId))
                .getWorkout());
    }

    @Override
    @Transactional
    public boolean applyTraining(long trainingId, LocalDate dateTime) {
        final TrainingPlan trainingPlan = trainingRepository.findById(trainingId)
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        trainingPlan.setApplied(true);

        final Workout workout = trainingPlan.getWorkout();

        WorkoutDto workoutDto = workoutMapper.entityToDto(workout);
        workoutDto.setDate(dateTime);

        workoutService.addWorkoutExerciseToWorkout(workoutDto);

        return true;
    }

    @Override
    @Transactional
    public void resetTrainings() {
        trainingRepository.findAll()
                .forEach(training -> training.setApplied(false));
    }

    @Override
    @Transactional
    public void deleteTraining(long id) {
        trainingRepository.deleteById(id);
    }

    @Override
    @Transactional
    public TrainingPlanDto updateTraining(long trainingId, TrainingPlanDto trainingDTO) {
        final TrainingPlan training = trainingRepository.findById(trainingId)
                .map(trainingPlan -> {
                    trainingPlan.setName(trainingDTO.getName());
                    trainingPlan.setTrainingDay(trainingDTO.getTrainingDay());
                    trainingPlan.setTrainingTime(trainingDTO.getTrainingTime());
                    trainingPlan.setScheduled(trainingDTO.isScheduled());
                    trainingPlan.setStartDate(trainingDTO.getStartDate());

                    return trainingPlan;
                })
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        return trainingMapper.entityToDtoWithWorkouts(training);
    }

    @Override
    @Transactional
    public boolean setScheduledForTraining(long trainingId, boolean scheduled) {
        final TrainingPlan training = trainingRepository.findById(trainingId)
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        log.info("Setting scheduled of training: {} to: {}", training.getId(), scheduled);

        training.setScheduled(scheduled);

        return true;
    }

}
