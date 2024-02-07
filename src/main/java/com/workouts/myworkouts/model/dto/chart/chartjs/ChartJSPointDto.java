package com.workouts.myworkouts.model.dto.chart.chartjs;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ChartJSPointDto {

    private String key;

    private BigDecimal value;
}
