package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class WithingsMeasureGroupDto {

    private int attrib;

    private long date;

    private List<WithingsMeasureDto> measures;

    private String comment;

}
