package com.workouts.myworkouts.model.dto.workout.projections;

import com.workouts.myworkouts.model.entity.workout.WorkoutExercise;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class WorkoutExerciseDateDto {

    private LocalDate date;

    private WorkoutExercise workoutExercise;
}
