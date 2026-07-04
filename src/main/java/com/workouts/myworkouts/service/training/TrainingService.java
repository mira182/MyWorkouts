package com.workouts.myworkouts.service.training;


import com.workouts.myworkouts.model.dto.training.TrainingExerciseDto;
import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;

import java.time.LocalDate;
import java.util.List;

public interface TrainingService {

    TrainingPlanDto createTraining(TrainingPlanDto trainingDTO);

    List<TrainingPlanDto> getAllTrainings();

    TrainingPlanDto getTrainingWithFetchedWorkoutExercise(long id);

    TrainingPlanDto addExerciseToTraining(long trainingId, TrainingExerciseDto trainingExerciseDto);

    boolean applyTraining(long trainingId, LocalDate dateTime);

    void resetTrainings();

    void deleteTraining(long trainingId);

    TrainingPlanDto updateTraining(long trainingId, TrainingPlanDto trainingDTO);

    boolean setScheduledForTraining(long trainingId, boolean scheduled);

}
