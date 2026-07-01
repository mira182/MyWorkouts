package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.MeasureBodyDto;
import com.workouts.myworkouts.model.dto.weight.withings.MeasureResponseDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasureGroupDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WithingsRestServiceImpl extends AbstractWithingsClient implements WithingsRestService {

    private final WithingsService withingsService;

    @Override
    public boolean retrieveAndStoreMeasurements(String token) {
        final List<WithingsMeasureGroupDto> allGroups = new ArrayList<>();
        String timezone = null;
        int offset = 0;
        boolean more = true;

        while (more) {
            final MeasureResponseDto responseDto = callGetMeas(token, offset).getBody();
            if (responseDto == null || responseDto.getStatus() != 0 || responseDto.getBody() == null) {
                log.warn("Withings getmeas returned no usable data (offset {}), aborting.", offset);
                return false;
            }

            final MeasureBodyDto body = responseDto.getBody();
            if (body.getMeasureGroups() != null) {
                allGroups.addAll(body.getMeasureGroups());
            }
            timezone = body.getTimezone();
            more = body.isMore();
            offset = body.getOffset();
        }

        final MeasureBodyDto allMeasurements = new MeasureBodyDto();
        allMeasurements.setTimezone(timezone);
        allMeasurements.setMeasureGroups(allGroups);
        withingsService.saveMeasurements(allMeasurements);

        return true;
    }
}
