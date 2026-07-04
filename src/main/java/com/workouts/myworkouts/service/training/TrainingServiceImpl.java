package com.workouts.myworkouts.service.training;

import com.workouts.myworkouts.exceptions.TrainingNotFoundException;
import com.workouts.myworkouts.model.dto.training.TrainingExerciseDto;
import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import com.workouts.myworkouts.model.entity.training.TrainingExercise;
import com.workouts.myworkouts.model.entity.training.TrainingPlan;
import com.workouts.myworkouts.model.entity.training.TrainingSet;
import com.workouts.myworkouts.model.mapper.ExerciseMapper;
import com.workouts.myworkouts.model.mapper.TrainingExerciseMapper;
import com.workouts.myworkouts.model.mapper.TrainingMapper;
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

    private final TrainingExerciseMapper trainingExerciseMapper;

    private final ExerciseMapper exerciseMapper;

    private final WorkoutService workoutService;

    @Override
    @Transactional
    public TrainingPlanDto createTraining(TrainingPlanDto trainingDTO) {
        return trainingMapper.entityToDtoWithExercises(trainingRepository.save(trainingMapper.dtoToEntity(trainingDTO)));
    }

    @Override
    @Transactional
    public List<TrainingPlanDto> getAllTrainings() {
        return trainingRepository.findAll().stream()
                .map(trainingMapper::entityToDtoWithoutExercises)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TrainingPlanDto getTrainingWithFetchedWorkoutExercise(long trainingId) {
        return trainingMapper.entityToDtoWithExercises(
                trainingRepository.findTrainingPlanWithWorkoutExercisesFetched(trainingId)
                        .orElseThrow(() -> new TrainingNotFoundException(trainingId)));
    }

    @Override
    @Transactional
    public TrainingPlanDto addExerciseToTraining(long trainingId, TrainingExerciseDto trainingExerciseDto) {
        final TrainingPlan trainingPlan = trainingRepository.findById(trainingId)
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        trainingPlan.addTrainingExercise(trainingExerciseMapper.dtoToEntity(trainingExerciseDto));

        return trainingMapper.entityToDtoWithExercises(trainingRepository.save(trainingPlan));
    }

    @Override
    @Transactional
    public boolean applyTraining(long trainingId, LocalDate dateTime) {
        final TrainingPlan trainingPlan = trainingRepository.findById(trainingId)
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        trainingPlan.setApplied(true);

        final WorkoutDto workoutDto = new WorkoutDto();
        workoutDto.setDate(dateTime);
        workoutDto.setWorkoutExercises(trainingPlan.getTrainingExercises().stream()
                .map(this::toWorkoutExerciseDto)
                .collect(Collectors.toList()));

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

                    // null = caller didn't load/edit exercises -> leave them untouched.
                    // A non-null list replaces them (orphanRemoval deletes the old rows).
                    if (trainingDTO.getTrainingExercises() != null) {
                        trainingPlan.getTrainingExercises().clear();
                        trainingDTO.getTrainingExercises().forEach(dto ->
                                trainingPlan.addTrainingExercise(trainingExerciseMapper.dtoToEntity(dto)));
                    }

                    return trainingPlan;
                })
                .orElseThrow(() -> new TrainingNotFoundException(trainingId));

        return trainingMapper.entityToDtoWithExercises(training);
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

    private WorkoutExerciseDto toWorkoutExerciseDto(TrainingExercise trainingExercise) {
        final WorkoutExerciseDto dto = new WorkoutExerciseDto();
        dto.setExercise(exerciseMapper.entityToDto(trainingExercise.getExercise()));
        dto.setWorkoutSets(trainingExercise.getTrainingSets().stream()
                .map(this::toWorkoutSetDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private WorkoutSetDto toWorkoutSetDto(TrainingSet trainingSet) {
        final WorkoutSetDto dto = new WorkoutSetDto();
        dto.setReps(trainingSet.getReps());
        dto.setWeight(trainingSet.getWeight());
        dto.setDuration(trainingSet.getDuration());
        dto.setDistance(trainingSet.getDistance());
        return dto;
    }

}
