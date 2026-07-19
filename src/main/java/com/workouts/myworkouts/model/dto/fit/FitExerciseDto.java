package com.workouts.myworkouts.model.dto.fit;

import java.util.List;

public record FitExerciseDto(String garminName, Long suggestedExerciseId, List<FitSetDto> sets) {
}
