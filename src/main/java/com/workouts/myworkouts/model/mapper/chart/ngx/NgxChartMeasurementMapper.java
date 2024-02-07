package com.workouts.myworkouts.model.mapper.chart.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.NgxChartDataPointDto;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NgxChartMeasurementMapper {

    @Mapping(target = "name", source = "date", dateFormat = "dd/MM/yyyy")
    NgxChartDataPointDto measurementToNgxDataPointDto(SingleMeasurement singleMeasurement);
}
