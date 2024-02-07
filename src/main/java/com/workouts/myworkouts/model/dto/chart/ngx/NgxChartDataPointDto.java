package com.workouts.myworkouts.model.dto.chart.ngx;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class NgxChartDataPointDto {

    private String name;

    private BigDecimal value;
}
