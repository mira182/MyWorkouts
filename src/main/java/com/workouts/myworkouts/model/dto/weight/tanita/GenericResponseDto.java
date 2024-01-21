package com.workouts.myworkouts.model.dto.weight.tanita;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GenericResponseDto {

    private boolean status;

    private String message;
}
