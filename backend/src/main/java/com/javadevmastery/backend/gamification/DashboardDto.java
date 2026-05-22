package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.learning.TopicCardDto;

import java.util.List;

public record DashboardDto(
        int xp,
        int level,
        int streakDays,
        long completedTopics,
        long startedTopics,
        List<TopicCardDto> recommendedTopics,
        List<WeeklyConsistencyPoint> weeklyConsistency
) {
}
