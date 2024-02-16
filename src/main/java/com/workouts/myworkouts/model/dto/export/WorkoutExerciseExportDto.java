package com.workouts.myworkouts.model.dto.export;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@ToString
public class WorkoutExerciseExportDto {

    private ExerciseExportDto exercise;

    private List<WorkoutSetExportDto> workoutSets;

    private LocalDate date;

    private LocalTime time;
}
