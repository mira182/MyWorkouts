package com.workouts.myworkouts.model.error;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class CustomErrorResponseDto {

    private int statusCode;
    private String message;
    private String timestamp;

    public CustomErrorResponseDto(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }
}
