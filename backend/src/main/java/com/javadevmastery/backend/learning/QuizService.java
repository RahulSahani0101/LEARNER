package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.common.ApiException;
import com.javadevmastery.backend.common.SecurityUtils;
import com.javadevmastery.backend.gamification.XpHistory;
import com.javadevmastery.backend.gamification.XpHistoryRepository;
import com.javadevmastery.backend.user.User;
import com.javadevmastery.backend.user.UserProfile;
import com.javadevmastery.backend.user.UserProfileRepository;
import com.javadevmastery.backend.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final TopicRepository topicRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final XpHistoryRepository xpHistoryRepository;
    private final SecurityUtils securityUtils;

    public QuizService(
            QuestionRepository questionRepository,
            TopicRepository topicRepository,
            QuizAttemptRepository quizAttemptRepository,
            UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            XpHistoryRepository xpHistoryRepository,
            SecurityUtils securityUtils
    ) {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.xpHistoryRepository = xpHistoryRepository;
        this.securityUtils = securityUtils;
    }

    public List<QuestionDto> getQuestions(Long topicId) {
        return questionRepository.findByTopicId(topicId).stream()
                .map(question -> new QuestionDto(
                        question.getId(),
                        question.getType().name(),
                        question.getPrompt(),
                        question.getOptionA(),
                        question.getOptionB(),
                        question.getOptionC(),
                        question.getOptionD()
                ))
                .toList();
    }

    public SubmitQuizResponse submitQuiz(SubmitQuizRequest request) {
        Long userId = securityUtils.currentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
        Topic topic = topicRepository.findById(request.topicId())
                .orElseThrow(() -> new ApiException("Topic not found", HttpStatus.NOT_FOUND));

        Map<Long, Question> questionMap = questionRepository.findByTopicId(request.topicId()).stream()
                .collect(java.util.stream.Collectors.toMap(Question::getId, question -> question));

        int correct = 0;
        for (SubmitQuizAnswerDto answer : request.answers()) {
            Question question = questionMap.get(answer.questionId());
            if (question == null) {
                continue;
            }
            String selectedOption = switch (answer.selectedOptionIndex()) {
                case 1 -> "A";
                case 2 -> "B";
                case 3 -> "C";
                case 4 -> "D";
                default -> "";
            };
            if (question.getCorrectOption().equals(selectedOption)) {
                correct += 1;
            }
        }

        int total = Math.max(questionMap.size(), 1);
        int scorePercent = (int) ((correct * 100.0) / total);
        boolean passed = scorePercent >= 70;

        QuizAttempt attempt = QuizAttempt.builder()
                .user(user)
                .topic(topic)
                .score(scorePercent)
                .totalQuestions(total)
                .passed(passed)
                .attemptedAt(Instant.now())
                .build();
        quizAttemptRepository.save(attempt);

        int xpAwarded = passed ? 150 : 40;
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("User profile not found", HttpStatus.NOT_FOUND));
        profile.setXp(profile.getXp() + xpAwarded);
        profile.setLevel(calculateLevel(profile.getXp()));
        userProfileRepository.save(profile);

        xpHistoryRepository.save(XpHistory.builder()
                .user(user)
                .points(xpAwarded)
                .reason(passed ? "QUIZ_PASS" : "QUIZ_ATTEMPT")
                .awardedAt(Instant.now())
                .build());

        return new SubmitQuizResponse(scorePercent, total, passed, xpAwarded);
    }

    private int calculateLevel(int xp) {
        if (xp >= 24000) return 10;
        if (xp >= 17000) return 9;
        if (xp >= 12000) return 8;
        if (xp >= 8000) return 7;
        if (xp >= 5000) return 6;
        if (xp >= 3000) return 5;
        if (xp >= 1800) return 4;
        if (xp >= 900) return 3;
        if (xp >= 400) return 2;
        return 1;
    }
}
