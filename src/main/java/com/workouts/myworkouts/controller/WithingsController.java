package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementsDto;
import com.workouts.myworkouts.service.weight.withings.WithingsRestService;
import com.workouts.myworkouts.service.weight.withings.WithingsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping(value = API_BASE_URL + "/weight/withings/measurements")
public class WithingsController {

    private final WithingsRestService withingsRestService;

    private final WithingsService withingsService;

    @PostMapping("/saveMeasurements")
    public boolean saveMeasurements(@RequestBody String token) {
        return withingsRestService.retrieveAndStoreMeasurements(token);
    }

    @GetMapping("/getMeasurements")
    public List<WithingsMeasurementsDto> getMeasurements() {
        return withingsService.getMeasurements();
    }

    @GetMapping("/getMeasurementByDate")
    public WithingsMeasurementsDto getMeasurementByDate(@RequestParam LocalDate date) {
        return withingsService.getMeasurementByDate(date);
    }
}
