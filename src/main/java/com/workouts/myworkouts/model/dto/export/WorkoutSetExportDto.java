package com.workouts.myworkouts.model.dto.export;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WorkoutSetExportDto {

    private int reps;

    private double weight;

    private int duration;

    private int distance;
}
