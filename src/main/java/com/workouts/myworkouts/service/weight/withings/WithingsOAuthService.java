package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsTokenResponseDto;

public interface WithingsOAuthService {

    String getWithingsAuthUrl();

    WithingsTokenResponseDto exchangeAuthorizationCode(String authorizationCode);
}


