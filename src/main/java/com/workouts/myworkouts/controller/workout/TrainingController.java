package com.workouts.myworkouts.controller.workout;

import com.workouts.myworkouts.model.dto.training.TrainingPlanDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.service.training.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL +  "/trainings")
public class TrainingController {

    private final TrainingService trainingService;

    @GetMapping
    public List<TrainingPlanDto> getAllTrainingsWithoutWorkouts() {
        return trainingService.getAllTrainings();
    }

    @GetMapping("/{trainingId}")
    public TrainingPlanDto getTrainingWithFetchedWorkouts(@PathVariable long trainingId) {
        return trainingService.getTrainingWithFetchedWorkoutExercise(trainingId);
    }

    @GetMapping("/{trainingId}/workouts")
    public WorkoutDto getWorkoutsForTraining(@PathVariable long trainingId) {
        return trainingService.getWorkoutForTraining(trainingId);
    }

    @GetMapping("/{trainingId}/{date}")
    public boolean applyTraining(@PathVariable long trainingId,
                                 @PathVariable
                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate date) {
        return trainingService.applyTraining(trainingId, date);
    }

    @PostMapping
    public TrainingPlanDto createTraining(@RequestBody TrainingPlanDto trainingDTO) {
        return trainingService.createTraining(trainingDTO);
    }

    @PostMapping("/{trainingId}")
    public TrainingPlanDto updateTraining(@PathVariable long trainingId, @RequestBody TrainingPlanDto trainingDTO) {
        return trainingService.updateTraining(trainingId, trainingDTO);
    }

    @GetMapping("/{trainingId}/setScheduled")
    public boolean setScheduledForTraining(@PathVariable long trainingId,
                                           @RequestParam boolean scheduled) {
        return trainingService.setScheduledForTraining(trainingId, scheduled);
    }

    @DeleteMapping("/{trainingId}")
    public void deleteTraining(@PathVariable long trainingId) {
        trainingService.deleteTraining(trainingId);
    }
}
