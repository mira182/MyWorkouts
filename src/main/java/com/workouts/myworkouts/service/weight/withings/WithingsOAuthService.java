package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsTokenResponseDto;

public interface WithingsOAuthService {

    String getWithingsAuthUrl(String state);

    WithingsTokenResponseDto exchangeAuthorizationCode(String authorizationCode);
}



