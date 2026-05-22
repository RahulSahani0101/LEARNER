package com.javadevmastery.backend.auth;

import com.javadevmastery.backend.config.AppJwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final AppJwtProperties jwtProperties;

    public JwtService(AppJwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String generateAccessToken(UserPrincipal principal) {
        Instant now = Instant.now();
        Instant expiry = now.plus(jwtProperties.accessExpirationMinutes(), ChronoUnit.MINUTES);

        return Jwts.builder()
                .subject(principal.getUsername())
                .claims(Map.of(
                        "uid", principal.getUserId(),
                        "name", principal.getDisplayName(),
                        "role", principal.getAuthorities().iterator().next().getAuthority(),
                        "type", "access"
                ))
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(accessKey())
                .compact();
    }

    public String generateRefreshToken(UserPrincipal principal) {
        Instant now = Instant.now();
        Instant expiry = now.plus(jwtProperties.refreshExpirationDays(), ChronoUnit.DAYS);

        return Jwts.builder()
                .subject(principal.getUsername())
                .claims(Map.of(
                        "uid", principal.getUserId(),
                        "type", "refresh"
                ))
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(refreshKey())
                .compact();
    }

    public String extractUsernameFromAccessToken(String token) {
        return parseAccessClaims(token).getSubject();
    }

    public String extractUsernameFromRefreshToken(String token) {
        return parseRefreshClaims(token).getSubject();
    }

    public boolean isAccessTokenValid(String token, UserPrincipal principal) {
        Claims claims = parseAccessClaims(token);
        return claims.getSubject().equals(principal.getUsername()) && claims.getExpiration().after(new Date());
    }

    private Claims parseAccessClaims(String token) {
        return Jwts.parser()
                .verifyWith(accessKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Claims parseRefreshClaims(String token) {
        return Jwts.parser()
                .verifyWith(refreshKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey accessKey() {
        return Keys.hmacShaKeyFor(jwtProperties.accessSecret().getBytes(StandardCharsets.UTF_8));
    }

    private SecretKey refreshKey() {
        return Keys.hmacShaKeyFor(jwtProperties.refreshSecret().getBytes(StandardCharsets.UTF_8));
    }
}
