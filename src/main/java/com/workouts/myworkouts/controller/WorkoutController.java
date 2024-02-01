package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.model.entity.workout.Workout;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequestMapping(API_BASE_URL + "/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @GetMapping()
    public WorkoutDto getWorkoutByDate(@RequestParam LocalDate date) {
        return workoutService.findByDate(date);
    }

    @PostMapping("/create")
    public WorkoutDto createWorkout(@RequestBody WorkoutDto workoutDto) {
        return workoutService.createWorkout(workoutDto);
    }

    @PostMapping("/addWorkoutExercise")
    public void addWorkoutExerciseToWorkout(@RequestParam long workoutId, @RequestBody WorkoutExerciseDto workoutExerciseDto) {
        workoutService.addWorkoutExerciseToWorkout(workoutId, workoutExerciseDto);
    }

    @DeleteMapping("/delete")
    public void deleteWorkout(@RequestParam long id) {
        workoutService.deleteWorkout(id);
    }
}
