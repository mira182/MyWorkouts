package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsTokenResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class WithingsOAuthServiceImpl implements WithingsOAuthService {

    private static final String OAUTH_TOKEN_URL = "https://wbsapi.withings.net/v2/oauth2";

    private static final String OUATH_URL= "https://account.withings.com/oauth2_user/authorize2?response_type=code&state=test&scope=user.metrics";

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${withings.client-id}")
    private String clientId;

    @Value("${withings.client-secret}")
    private String clientSecret;

    @Value("${withings.redirect-uri}")
    private String redirectUri;

    @Override
    public String getWithingsAuthUrl() {
        return UriComponentsBuilder.fromUriString(OUATH_URL)
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectUri)
                .encode()
                .toUriString();
    }

    @Override
    public WithingsTokenResponseDto exchangeAuthorizationCode(String authorizationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("action", "requesttoken");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("grant_type", "authorization_code");
        body.add("code", authorizationCode);
        body.add("redirect_uri", redirectUri);

        HttpEntity<?> entity = new HttpEntity<>(body, headers);

        HttpEntity<WithingsTokenResponseDto> response = restTemplate.exchange(
                OAUTH_TOKEN_URL,
                HttpMethod.POST,
                entity,
                WithingsTokenResponseDto.class);

        return response.getBody();
    }
}