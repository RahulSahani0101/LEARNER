package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.user.UserProfile;
import com.javadevmastery.backend.user.UserProfileRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class StreakResetScheduler {

    private final UserProfileRepository userProfileRepository;
    private final DailyActivityRepository dailyActivityRepository;

    public StreakResetScheduler(UserProfileRepository userProfileRepository, DailyActivityRepository dailyActivityRepository) {
        this.userProfileRepository = userProfileRepository;
        this.dailyActivityRepository = dailyActivityRepository;
    }

    @Scheduled(cron = "0 5 0 * * *", zone = "Asia/Kolkata")
    public void resetStreakForInactiveUsers() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        Set<Long> activeYesterday = new HashSet<>(
                dailyActivityRepository.findAll().stream()
                        .filter(activity -> activity.getActivityDate().isEqual(yesterday))
                        .map(activity -> activity.getUser().getId())
                        .toList()
        );

        List<UserProfile> profiles = userProfileRepository.findAll();
        for (UserProfile profile : profiles) {
            if (!activeYesterday.contains(profile.getUser().getId())) {
                if (profile.getStreakFreezes() > 0) {
                    profile.setStreakFreezes(profile.getStreakFreezes() - 1);
                } else {
                    profile.setStreakDays(0);
                }
            }
        }
        userProfileRepository.saveAll(profiles);
    }
}
