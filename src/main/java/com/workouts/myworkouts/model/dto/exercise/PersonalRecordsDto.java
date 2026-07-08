package com.workouts.myworkouts.model.dto.exercise;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * All-time bests for a single exercise, computed across every logged set.
 */
@Getter
@Setter
@Builder
public class PersonalRecordsDto {

    /** Heaviest single set. */
    private double maxWeight;

    /** Most reps in a single set. */
    private int maxReps;

    /** Best single-set volume (weight * reps). */
    private double bestSetVolume;

    /** Best estimated 1RM (Epley: weight * (1 + reps / 30)). */
    private double estimatedOneRepMax;
}
