package com.workouts.myworkouts.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MeasurementType {
    WEIGHT("weight");

    private String tanitaColumnName;
}
