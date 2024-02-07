package com.workouts.myworkouts.service.chart.weight.provider.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.weight.NgxWeightChartDataDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.model.mapper.chart.ngx.NgxChartMapper;
import com.workouts.myworkouts.service.chart.weight.provider.MeasurementDataProvider;
import com.workouts.myworkouts.service.chart.weight.provider.WeightChartsDataProvider;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NgxWeightChartsDataProvider implements WeightChartsDataProvider<NgxWeightChartDataDto> {

    private final MeasurementDataProvider measurementDataProvider;

    private final NgxChartMapper ngxChartMapper;

    @Override
    public NgxWeightChartDataDto provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType) {
        return ngxChartMapper.measurementsToNgxChartData(measurementType,
                measurementDataProvider.provideData(measurementsProviderType, measurementType));
    }
}
