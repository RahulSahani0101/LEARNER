package com.javadevmastery.backend.learning;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record SubmitQuizAnswerDto(
        @NotNull Long questionId,
        @NotNull @Min(1) @Max(4) Integer selectedOptionIndex
) {
}
