package com.workouts.myworkouts.model.dto.fit;

import java.time.LocalDate;
import java.util.List;

/** Draft workout parsed from a Garmin FIT file — reviewed by the user before saving. */
public record FitWorkoutDto(LocalDate date, List<FitExerciseDto> exercises) {
}
