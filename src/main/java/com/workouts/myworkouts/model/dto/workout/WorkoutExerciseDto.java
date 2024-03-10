package com.workouts.myworkouts.model.dto.workout;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class WorkoutExerciseDto {

    private Long id;

    private LocalDate date;

    private ExerciseDto exercise;

    private List<WorkoutSetDto> workoutSets;

}
