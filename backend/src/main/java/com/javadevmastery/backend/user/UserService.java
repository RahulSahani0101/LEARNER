package com.javadevmastery.backend.user;

import com.javadevmastery.backend.common.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    public UserService(UserRepository userRepository, UserProfileRepository userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public User findByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public UserProfile findProfileByUserId(Long userId) {
        return userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("User profile not found", HttpStatus.NOT_FOUND));
    }
}
