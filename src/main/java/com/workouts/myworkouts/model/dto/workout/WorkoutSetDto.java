package com.workouts.myworkouts.model.dto.workout;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WorkoutSetDto {

    private Long id;

    private int reps;

    private double weight;

    private int duration;

    private int distance;
}
