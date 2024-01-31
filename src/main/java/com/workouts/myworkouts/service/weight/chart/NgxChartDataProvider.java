package com.workouts.myworkouts.service.weight.chart;

import com.workouts.myworkouts.model.dto.weight.chart.ngx.NgxChartDataDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.model.mapper.chart.ngx.NgxChartMapper;
import com.workouts.myworkouts.service.weight.chart.provider.MeasurementDataProvider;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NgxChartDataProvider implements ChartDataProvider<NgxChartDataDto> {

    private final MeasurementDataProvider measurementDataProvider;

    private final NgxChartMapper ngxChartMapper;

    @Override
    public NgxChartDataDto provideData(@NonNull MeasurementsProviderType measurementsProviderType, @NonNull MeasurementType measurementType) {
        return ngxChartMapper.measurementsToNgxChartData(measurementType,
                measurementDataProvider.provideData(measurementsProviderType, measurementType));
    }
}
