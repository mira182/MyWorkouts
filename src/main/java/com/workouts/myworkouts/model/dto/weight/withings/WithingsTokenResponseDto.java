package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Data;

@Data
public class WithingsTokenResponseDto {

    private int status;

    private WithingsTokenBodyDto body;
}


