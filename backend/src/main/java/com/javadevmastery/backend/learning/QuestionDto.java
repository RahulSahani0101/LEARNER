package com.javadevmastery.backend.learning;

public record QuestionDto(
        Long id,
        String type,
        String prompt,
        String optionA,
        String optionB,
        String optionC,
        String optionD
) {
}
