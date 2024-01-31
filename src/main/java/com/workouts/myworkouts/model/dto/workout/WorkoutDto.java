package com.workouts.myworkouts.model.dto.workout;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class WorkoutDto {

    private LocalDate date;

    private String note;

    private List<WorkoutExerciseDto> exercises;
}
