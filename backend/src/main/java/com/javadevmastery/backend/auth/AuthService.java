package com.javadevmastery.backend.auth;

import com.javadevmastery.backend.common.ApiException;
import com.javadevmastery.backend.user.User;
import com.javadevmastery.backend.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AppUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            AppUserDetailsService userDetailsService,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));

        String accessToken = jwtService.generateAccessToken(principal);
        String refreshToken = jwtService.generateRefreshToken(principal);

        return new AuthResponse(accessToken, refreshToken, user.getEmail(), user.getFullName(), user.getRole().name());
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String username = jwtService.extractUsernameFromRefreshToken(request.refreshToken());
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UserPrincipal principal = (UserPrincipal) userDetails;
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));

        String accessToken = jwtService.generateAccessToken(principal);
        String refreshToken = jwtService.generateRefreshToken(principal);

        return new AuthResponse(accessToken, refreshToken, user.getEmail(), user.getFullName(), user.getRole().name());
    }
}
