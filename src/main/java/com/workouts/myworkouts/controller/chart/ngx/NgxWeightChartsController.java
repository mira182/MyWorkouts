package com.workouts.myworkouts.controller.chart.ngx;

import com.workouts.myworkouts.model.dto.chart.ngx.weight.NgxWeightChartDataDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.service.chart.weight.provider.ngx.NgxWeightChartsDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/charts/weight")
public class NgxWeightChartsController {


    private final NgxWeightChartsDataProvider ngxChartDataProvider;

    @GetMapping(value = "/ngx/{measurementsProviderType}/getMeasurementsByType")
    public NgxWeightChartDataDto getMeasurementByTypeBetweenDates(@PathVariable MeasurementsProviderType measurementsProviderType,
                                                                  @RequestParam MeasurementType measurementType) {

        return ngxChartDataProvider.provideData(measurementsProviderType, measurementType);
    }
}
