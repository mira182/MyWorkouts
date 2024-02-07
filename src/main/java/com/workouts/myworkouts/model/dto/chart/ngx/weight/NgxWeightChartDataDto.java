package com.workouts.myworkouts.model.dto.chart.ngx.weight;

import com.workouts.myworkouts.model.dto.chart.ngx.NgxChartDataPointDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NgxWeightChartDataDto {

    private MeasurementType name;

    private List<NgxChartDataPointDto> series;

}
