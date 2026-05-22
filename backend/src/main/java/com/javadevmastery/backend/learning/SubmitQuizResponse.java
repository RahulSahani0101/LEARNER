package com.javadevmastery.backend.learning;

public record SubmitQuizResponse(
        int score,
        int total,
        boolean passed,
        int xpAwarded
) {
}
