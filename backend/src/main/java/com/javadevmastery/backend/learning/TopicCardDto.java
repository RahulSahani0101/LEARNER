package com.javadevmastery.backend.learning;

public record TopicCardDto(
        Long id,
        String slug,
        String title,
        String category,
        String summary,
        int estimatedMinutes,
        int orderIndex,
        int completionPercent,
        boolean completed
) {
}
