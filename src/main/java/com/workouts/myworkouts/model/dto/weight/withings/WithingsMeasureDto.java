package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WithingsMeasureDto {

    private int value;

    private WithingsMeasureType type;

    private int unit;

}
