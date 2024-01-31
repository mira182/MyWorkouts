package com.workouts.myworkouts.model.mapper.chart.ngx;

import com.workouts.myworkouts.model.dto.weight.chart.ngx.NgxChartDataDto;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = NgxChartMeasurementMapper.class)
public interface NgxChartMapper {


    @Mapping(target = "name", source = "measurementType")
    @Mapping(target = "series", source = "measurements")
    NgxChartDataDto measurementsToNgxChartData(MeasurementType measurementType, List<SingleMeasurement> measurements);
}
