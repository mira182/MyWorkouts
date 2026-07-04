package com.workouts.myworkouts.model.dto.training;

import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TrainingExerciseDto {

    private Long id;

    private ExerciseDto exercise;

    private List<TrainingSetDto> trainingSets;

    private Integer position;
}
