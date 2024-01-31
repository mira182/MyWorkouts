package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.weight.tanita.GenericResponseDto;
import com.workouts.myworkouts.model.dto.weight.tanita.TanitaMeasurementsDto;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.service.gmail.GmailService;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.service.weight.tanita.TanitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = API_BASE_URL + "/weight/tanita/measurements")
public class TanitaController {

    private final TanitaService tanitaService;

    private final GmailService gmailService;

    @GetMapping(value = "/getMeasurements")
    public List<TanitaMeasurementsDto> getMeasurements() {
        return tanitaService.getAllMeasurements();
    }

    @GetMapping("/getMeasurementByDate")
    public TanitaMeasurementsDto getMeasurementByDate(@RequestParam LocalDate date) {
        return tanitaService.getMeasurementByDate(date);
    }

    @GetMapping(value = "/updateMeasurements")
    public GenericResponseDto updateWeightReport() throws IOException, GeneralSecurityException {
        return tanitaService.saveWeightReport();
    }

    @GetMapping(value = "/doesNewEmailExist")
    public boolean doesNewTanitaEmailExist() throws IOException, GeneralSecurityException {
        return gmailService.doesNewTanitaEmailExist();
    }
}
