package com.workouts.myworkouts.model.dto.weight.chart.ngx;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class NgxChartDataPointDto {

    private LocalDate name;

    private BigDecimal value;
}
