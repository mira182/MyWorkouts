package com.workouts.myworkouts.controller.weight;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsAuthUrlResponseDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsTokenResponseDto;
import com.workouts.myworkouts.service.weight.withings.WithingsOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_BASE_URL + "/weight/withings/oauth")
public class WithingsOAuthController {

    private final WithingsOAuthService withingsOAuthService;

    @PostMapping("/exchange")
    public WithingsTokenResponseDto exchange(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        return withingsOAuthService.exchangeAuthorizationCode(code);
    }

    @GetMapping("/auth-redirect")
    public WithingsAuthUrlResponseDto getWithingsAuthUrl() {
        String authUrl = withingsOAuthService.getWithingsAuthUrl();
        return new WithingsAuthUrlResponseDto(authUrl);
    }
}