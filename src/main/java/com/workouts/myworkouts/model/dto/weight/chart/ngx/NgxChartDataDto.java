package com.workouts.myworkouts.model.dto.weight.chart.ngx;

import com.workouts.myworkouts.model.enums.MeasurementType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Builder
public class NgxChartDataDto {

    private MeasurementType name;

    private List<NgxChartDataPointDto> series;

}
