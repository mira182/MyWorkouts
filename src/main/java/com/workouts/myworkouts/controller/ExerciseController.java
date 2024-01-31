package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.ExerciseType;
import com.workouts.myworkouts.service.exercise.ExerciseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ExerciseDto createExercise(
            @RequestPart("exercise") ExerciseDto exerciseDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        log.info("Received exercise: {}", exerciseDto);
        return exerciseService.createExercise(exerciseDto, file);
    }

    @GetMapping("/getByCategory")
    public List<ExerciseDto> getAllExercisesByCategory(@RequestParam ExerciseCategory category) {
        return exerciseService.findAllByCategory(category);
    }

    @GetMapping("/categories")
    public List<ExerciseCategory> getAllCategories() {
        return List.of(ExerciseCategory.values());
    }

    @GetMapping("/types")
    public List<ExerciseType> getAllTypes() {
        return List.of(ExerciseType.values());
    }

    @GetMapping
    public List<ExerciseDto> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @PatchMapping(path = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ExerciseDto editExercise(
            @RequestPart("exercise") ExerciseDto exerciseDto,
            @PathVariable("id") Long id,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return exerciseService.updateExercise(exerciseDto, id, file);
    }

    @DeleteMapping("/{exerciseId}")
    public boolean deleteExercise(@PathVariable Long exerciseId) {
        return exerciseService.deleteExercise(exerciseId);
    }

}
