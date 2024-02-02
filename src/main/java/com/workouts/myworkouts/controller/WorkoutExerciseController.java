package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.service.workout.WorkoutExerciseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@Slf4j
@RestController
@RequestMapping(API_BASE_URL + "/workoutExercise")
@RequiredArgsConstructor
public class WorkoutExerciseController {

    private final WorkoutExerciseService workoutExerciseService;

    @PatchMapping()
    public WorkoutExerciseDto updateWorkout(@RequestBody WorkoutExerciseDto workoutExerciseDto) {
        return workoutExerciseService.updateWorkout(workoutExerciseDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workoutExerciseService.deleteWorkout(id);
    }
}
