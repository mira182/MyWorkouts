package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.MeasureResponseDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasureType;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.stream.Collectors;

public abstract class AbstractWithingsClient {

    private static final String MEASURES_URL = "https://wbsapi.withings.net/measure";

    private static final String MEAS_TYPES = Arrays.stream(WithingsMeasureType.values())
            .map(type -> String.valueOf(type.getCode()))
            .collect(Collectors.joining(","));

    private final RestTemplate restTemplate = new RestTemplate();

    @SneakyThrows
    HttpEntity<MeasureResponseDto> callGetMeas(String token, int offset) {
        LocalDateTime time = LocalDateTime.of(2021, 7, 4, 0, 0);
        ZoneId zoneId = ZoneId.of("Europe/Prague");
        long lastUpdate = time.atZone(zoneId).toEpochSecond();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("action", "getmeas");
        body.add("meastype", MEAS_TYPES);
        body.add("category", "1");
        body.add("lastupdate", String.valueOf(lastUpdate));
        if (offset > 0) {
            body.add("offset", String.valueOf(offset));
        }

        HttpEntity<?> entity = new HttpEntity<>(body, headers);

        return restTemplate.exchange(
                MEASURES_URL,
                HttpMethod.POST,
                entity,
                MeasureResponseDto.class);
    }
}
