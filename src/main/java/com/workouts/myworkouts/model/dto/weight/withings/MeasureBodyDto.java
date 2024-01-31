package com.workouts.myworkouts.model.dto.weight.withings;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class MeasureBodyDto {

    private String timezone;

    private List<WithingsMeasureGroupDto> measureGroups;
}
