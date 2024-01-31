package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.weight.chart.ngx.NgxChartDataDto;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.model.enums.MeasurementsProviderType;
import com.workouts.myworkouts.service.weight.chart.NgxChartDataProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/charts")
public class NgxChartsController {


    private final NgxChartDataProvider ngxChartDataProvider;

    @GetMapping(value = "/ngx/{measurementsProviderType}/getMeasurementsByType")
    public NgxChartDataDto getMeasurementByTypeBetweenDates(@PathVariable MeasurementsProviderType measurementsProviderType,
                                                            @RequestParam MeasurementType measurementType) {

        return ngxChartDataProvider.provideData(measurementsProviderType, measurementType);
    }
}
