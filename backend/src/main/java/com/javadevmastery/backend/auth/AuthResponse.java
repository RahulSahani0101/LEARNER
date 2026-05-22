package com.javadevmastery.backend.auth;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String email,
        String fullName,
        String role
) {
}
