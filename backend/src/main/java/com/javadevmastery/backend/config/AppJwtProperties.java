package com.javadevmastery.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public record AppJwtProperties(
        String accessSecret,
        String refreshSecret,
        int accessExpirationMinutes,
        int refreshExpirationDays
) {
}
