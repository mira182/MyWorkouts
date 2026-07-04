package com.workouts.myworkouts.model.dto.training;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrainingSetDto {

    private int reps;

    private double weight;

    private int duration;

    private int distance;
}
