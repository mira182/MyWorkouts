package com.workouts.myworkouts.service.chart.weight.provider.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.weight.NgxWeightChartDataDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProvider;
import com.workouts.myworkouts.model.mapper.chart.ngx.NgxChartMapper;
import com.workouts.myworkouts.service.chart.weight.provider.MeasurementDataProvider;
import com.workouts.myworkouts.service.chart.weight.provider.WeightChartsDataProvider;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NgxWeightChartsDataProvider implements WeightChartsDataProvider<NgxWeightChartDataDto> {

    private final MeasurementDataProvider measurementDataProvider;

    private final NgxChartMapper ngxChartMapper;

    @Override
    @Cacheable(value = "weightCharts", key = "#measurementsProvider + '-' + #measurementType")
    public NgxWeightChartDataDto provideData(@NonNull MeasurementsProvider measurementsProvider, @NonNull MeasurementType measurementType) {
        return ngxChartMapper.measurementsToNgxChartData(measurementType,
                measurementDataProvider.provideData(measurementsProvider, measurementType));
    }
}
