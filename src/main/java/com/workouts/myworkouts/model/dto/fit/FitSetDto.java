package com.workouts.myworkouts.model.dto.fit;

/** One active set parsed from a Garmin FIT strength activity. */
public record FitSetDto(int reps, double weight, int duration) {
}
