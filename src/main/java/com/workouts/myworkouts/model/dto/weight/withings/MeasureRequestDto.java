package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Builder;

@Builder
public class MeasureRequestDto {

    private String action;

    private String meastype;

    private int category;

    private long lastupdate;
}
