package com.workouts.myworkouts.model.dto.weight.withings;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("measuregrps")
    private List<WithingsMeasureGroupDto> measureGroups;
}
