package com.workouts.myworkouts.model.dto.exercise;

import com.workouts.myworkouts.model.dto.workout.WorkoutSetDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/**
 * Progress context for an exercise: what was done last time + all-time personal records.
 */
@Getter
@Setter
@Builder
public class ExerciseStatsDto {

    /** Date of the most recent previous session for this exercise (null if never done). */
    private LocalDate lastSessionDate;

    /** Sets performed in that most recent previous session. */
    private List<WorkoutSetDto> lastSessionSets;

    private PersonalRecordsDto personalRecords;
}
