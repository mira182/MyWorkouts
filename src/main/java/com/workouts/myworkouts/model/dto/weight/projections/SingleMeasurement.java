package com.workouts.myworkouts.model.dto.weight.projections;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class SingleMeasurement {

    private LocalDateTime date;

    private double value;
}
