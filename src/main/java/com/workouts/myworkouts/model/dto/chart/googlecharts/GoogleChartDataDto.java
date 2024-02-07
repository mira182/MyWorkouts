package com.workouts.myworkouts.model.dto.chart.googlecharts;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GoogleChartDataDto<T> {

    private List<T> data;
}
