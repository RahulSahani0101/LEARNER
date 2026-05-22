package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.common.SecurityUtils;
import com.javadevmastery.backend.learning.TopicCardDto;
import com.javadevmastery.backend.learning.TopicProgress;
import com.javadevmastery.backend.learning.TopicProgressRepository;
import com.javadevmastery.backend.learning.TopicRepository;
import com.javadevmastery.backend.user.UserProfile;
import com.javadevmastery.backend.user.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserProfileRepository userProfileRepository;
    private final TopicRepository topicRepository;
    private final TopicProgressRepository topicProgressRepository;
    private final DailyActivityRepository dailyActivityRepository;
    private final SecurityUtils securityUtils;

    public DashboardService(
            UserProfileRepository userProfileRepository,
            TopicRepository topicRepository,
            TopicProgressRepository topicProgressRepository,
            DailyActivityRepository dailyActivityRepository,
            SecurityUtils securityUtils
    ) {
        this.userProfileRepository = userProfileRepository;
        this.topicRepository = topicRepository;
        this.topicProgressRepository = topicProgressRepository;
        this.dailyActivityRepository = dailyActivityRepository;
        this.securityUtils = securityUtils;
    }

    public DashboardDto getDashboard() {
        Long userId = securityUtils.currentUserId();
        UserProfile profile = userProfileRepository.findByUserId(userId).orElseThrow();

        List<TopicProgress> allProgress = topicProgressRepository.findByUserId(userId);
        long completed = allProgress.stream().filter(TopicProgress::isCompleted).count();
        long started = allProgress.stream().filter(progress -> progress.getCompletionPercent() > 0).count();

        Map<Long, TopicProgress> progressMap = allProgress.stream()
                .collect(Collectors.toMap(progress -> progress.getTopic().getId(), progress -> progress));

        List<TopicCardDto> recommended = topicRepository.findAllByOrderByOrderIndexAsc().stream()
                .limit(5)
                .map(topic -> {
                    TopicProgress progress = progressMap.get(topic.getId());
                    int completion = progress != null ? progress.getCompletionPercent() : 0;
                    boolean done = progress != null && progress.isCompleted();
                    return new TopicCardDto(topic.getId(), topic.getSlug(), topic.getTitle(), topic.getCategory().name(), topic.getSummary(), topic.getEstimatedMinutes(), topic.getOrderIndex(), completion, done);
                })
                .toList();

        List<DailyActivity> activities = dailyActivityRepository.findByUserId(userId);
        Map<LocalDate, Long> counts = activities.stream()
                .collect(Collectors.groupingBy(DailyActivity::getActivityDate, Collectors.counting()));

        List<WeeklyConsistencyPoint> weekly = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i -= 1) {
            LocalDate date = today.minusDays(i);
            String day = shortDay(date.getDayOfWeek());
            int minutes = (int) (counts.getOrDefault(date, 0L) * 25);
            weekly.add(new WeeklyConsistencyPoint(day, minutes));
        }

        return new DashboardDto(
                profile.getXp(),
                profile.getLevel(),
                profile.getStreakDays(),
                completed,
                started,
                recommended,
                weekly
        );
    }

    private String shortDay(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> "Mon";
            case TUESDAY -> "Tue";
            case WEDNESDAY -> "Wed";
            case THURSDAY -> "Thu";
            case FRIDAY -> "Fri";
            case SATURDAY -> "Sat";
            case SUNDAY -> "Sun";
        };
    }
}
