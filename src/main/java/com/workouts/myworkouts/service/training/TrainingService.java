package com.workouts.myworkouts.service.training;


import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TrainingService {

    TrainingPlanDto createTraining(TrainingPlanDto trainingDTO);

    List<TrainingPlanDto> getAllTrainings();

    TrainingPlanDto getTrainingWithFetchedWorkoutExercise(long id);

    WorkoutDto getWorkoutForTraining(long trainingId);

    boolean applyTraining(long trainingId, LocalDate dateTime);

    void resetTrainings();

    void deleteTraining(long trainingId);

    TrainingPlanDto updateTraining(long trainingId, TrainingPlanDto trainingDTO);

    boolean setScheduledForTraining(long trainingId, boolean scheduled);

}
