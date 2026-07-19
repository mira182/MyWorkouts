package com.workouts.myworkouts.controller.workout;

import com.workouts.myworkouts.model.dto.fit.FitWorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutDto;
import com.workouts.myworkouts.model.dto.workout.WorkoutExerciseDto;
import com.workouts.myworkouts.service.fit.FitImportService;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequestMapping(API_BASE_URL + "/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    private final FitImportService fitImportService;

    @GetMapping()
    public WorkoutDto getWorkoutByDate(@RequestParam LocalDate date) {
        return workoutService.findByDate(date);
    }

    @GetMapping("/dates")
    public List<LocalDate> getWorkoutDates(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return workoutService.findWorkoutDatesBetweenDates(startDate, endDate);
    }

    @PostMapping("/create")
    public WorkoutDto createWorkout(@RequestBody WorkoutDto workoutDto) {
        return workoutService.addWorkoutExerciseToWorkout(workoutDto);
    }

    @PostMapping(value = "/importFit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public FitWorkoutDto importFit(@RequestPart("file") MultipartFile file) {
        return fitImportService.parseFitFile(file);
    }

    @PostMapping("/copyLast")
    public WorkoutDto copyLastWorkout(@RequestParam LocalDate date) {
        return workoutService.copyLastWorkout(date);
    }

    @PatchMapping("/note")
    public void updateNote(@RequestParam long workoutId, @RequestBody(required = false) String note) {
        workoutService.updateNote(workoutId, note);
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
