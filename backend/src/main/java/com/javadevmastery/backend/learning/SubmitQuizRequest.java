package com.javadevmastery.backend.learning;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SubmitQuizRequest(
        @NotNull Long topicId,
        @NotEmpty List<@Valid SubmitQuizAnswerDto> answers
) {
}
