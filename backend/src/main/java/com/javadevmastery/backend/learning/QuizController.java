package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/{topicId}/questions")
    public ApiResponse<List<QuestionDto>> questions(@PathVariable Long topicId) {
        return ApiResponse.ok("Questions fetched", quizService.getQuestions(topicId));
    }

    @PostMapping("/submit")
    public ApiResponse<SubmitQuizResponse> submit(@Valid @RequestBody SubmitQuizRequest request) {
        return ApiResponse.ok("Quiz submitted", quizService.submitQuiz(request));
    }
}
