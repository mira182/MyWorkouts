package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.MeasureResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WithingsRestServiceImpl extends AbstractWithingsClient implements WithingsRestService {

    private final WithingsService withingsService;

    @Override
    public boolean retrieveAndStoreMeasurements(String token) {
        final HttpEntity<MeasureResponseDto> response = callGetMeas(token);
        final MeasureResponseDto responseDto = response.getBody();

        if (responseDto != null && responseDto.getStatus() == 0) {
            withingsService.saveMeasurements(responseDto.getBody());
        }

        return true;
    }
}
