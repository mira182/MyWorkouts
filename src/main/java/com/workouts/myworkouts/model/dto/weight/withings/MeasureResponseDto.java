package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MeasureResponseDto {

    private int status;

    private MeasureBodyDto body;
}
