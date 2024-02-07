package com.workouts.myworkouts.model.dto.chart.googlecharts;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleChartDataPointDto<X, Y> {

    private X name;

    private Y value;
}
