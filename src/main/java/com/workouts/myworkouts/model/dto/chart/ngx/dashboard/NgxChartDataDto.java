package com.workouts.myworkouts.model.dto.chart.ngx.dashboard;

import com.workouts.myworkouts.model.dto.chart.ngx.NgxChartDataPointDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NgxChartDataDto {

    private List<NgxChartDataPointDto> data;
}
