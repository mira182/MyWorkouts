package com.workouts.myworkouts.model.dto.workout;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDto {

    private LocalDate date;

    private String note;

    private List<WorkoutExerciseDto> workoutExercises;
}
