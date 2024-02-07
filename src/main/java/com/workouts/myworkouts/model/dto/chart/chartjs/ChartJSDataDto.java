package com.workouts.myworkouts.model.dto.chart.chartjs;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChartJSDataDto<T> {

    private List<String> labels;

    private List<T> data;
}
