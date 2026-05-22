package com.javadevmastery.backend.learning;

import java.util.List;

public record TopicDetailDto(
        Long id,
        String slug,
        String title,
        String category,
        String summary,
        int estimatedMinutes,
        List<String> interviewPoints,
        List<String> commonMistakes,
        List<String> practiceProblems
) {
}
