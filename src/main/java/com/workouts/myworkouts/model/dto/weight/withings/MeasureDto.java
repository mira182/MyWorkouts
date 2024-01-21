package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MeasureDto {

    private int value;

    private MeasureType type;

    private int unit;

}
