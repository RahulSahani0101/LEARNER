package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.common.ApiResponse;
import com.javadevmastery.backend.user.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;

    public AdminController(UserRepository userRepository, BadgeRepository badgeRepository) {
        this.userRepository = userRepository;
        this.badgeRepository = badgeRepository;
    }

    @GetMapping("/overview")
    public ApiResponse<Map<String, Long>> overview() {
        Map<String, Long> payload = Map.of(
                "users", userRepository.count(),
                "badges", badgeRepository.count()
        );
        return ApiResponse.ok("Admin overview fetched", payload);
    }
}
