package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MeasureGroupDto {

    private int attrib;

    private long date;

    private List<MeasureDto> measures;

    private String comment;

}
