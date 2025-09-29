package com.workouts.myworkouts.model.dto.weight.withings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WithingsTokenBodyDto {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("expires_in")
    private Long expiresIn;

    @JsonProperty("token_type")
    private String tokenType;
}


