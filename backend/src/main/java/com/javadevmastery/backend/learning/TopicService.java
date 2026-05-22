package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.common.ApiException;
import com.javadevmastery.backend.common.SecurityUtils;
import com.javadevmastery.backend.user.User;
import com.javadevmastery.backend.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final TopicProgressRepository topicProgressRepository;
    private final UserRepository userRepository;
    private final SecurityUtils securityUtils;

    public TopicService(
            TopicRepository topicRepository,
            TopicProgressRepository topicProgressRepository,
            UserRepository userRepository,
            SecurityUtils securityUtils
    ) {
        this.topicRepository = topicRepository;
        this.topicProgressRepository = topicProgressRepository;
        this.userRepository = userRepository;
        this.securityUtils = securityUtils;
    }

    public List<TopicCardDto> getTopicCards() {
        Long userId = securityUtils.currentUserId();
        List<Topic> topics = topicRepository.findAllByOrderByOrderIndexAsc();
        Map<Long, TopicProgress> progressMap = topicProgressRepository.findByUserId(userId)
                .stream()
                .collect(java.util.stream.Collectors.toMap(tp -> tp.getTopic().getId(), tp -> tp));

        return topics.stream()
                .map(topic -> {
                    TopicProgress progress = progressMap.get(topic.getId());
                    int completion = progress != null ? progress.getCompletionPercent() : 0;
                    boolean completed = progress != null && progress.isCompleted();
                    return new TopicCardDto(
                            topic.getId(),
                            topic.getSlug(),
                            topic.getTitle(),
                            topic.getCategory().name(),
                            topic.getSummary(),
                            topic.getEstimatedMinutes(),
                            topic.getOrderIndex(),
                            completion,
                            completed
                    );
                })
                .toList();
    }

    public TopicDetailDto getTopicDetail(String slug) {
        Topic topic = topicRepository.findBySlug(slug)
                .orElseThrow(() -> new ApiException("Topic not found", HttpStatus.NOT_FOUND));

        return new TopicDetailDto(
                topic.getId(),
                topic.getSlug(),
                topic.getTitle(),
                topic.getCategory().name(),
                topic.getSummary(),
                topic.getEstimatedMinutes(),
                List.of(
                        "Explain " + topic.getTitle() + " with a practical backend scenario.",
                        "Compare this concept with a closely related Java alternative.",
                        "Discuss performance and memory impact in production systems.",
                        "Show how this is tested in Spring Boot service-layer code.",
                        "Mention one edge case interviewers often ask for this topic."
                ),
                List.of(
                        "Learning only syntax without understanding runtime behavior.",
                        "Ignoring complexity tradeoffs while selecting implementation.",
                        "Skipping exception handling and input validation.",
                        "Not writing tests for boundary conditions."
                ),
                List.of(
                        "Implement a small feature using this concept in a REST API.",
                        "Write JUnit test cases that cover success and failure paths.",
                        "Measure performance for two alternative implementations."
                )
        );
    }

    public void markTopicProgress(Long topicId, int completionPercent) {
        Long userId = securityUtils.currentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ApiException("Topic not found", HttpStatus.NOT_FOUND));

        TopicProgress progress = topicProgressRepository.findByUserIdAndTopicId(userId, topicId)
                .orElseGet(() -> TopicProgress.builder()
                        .topic(topic)
                        .user(user)
                        .completionPercent(0)
                        .completed(false)
                        .lastActiveDate(LocalDate.now())
                        .build());

        progress.setCompletionPercent(Math.max(0, Math.min(completionPercent, 100)));
        progress.setCompleted(progress.getCompletionPercent() == 100);
        progress.setLastActiveDate(LocalDate.now());

        topicProgressRepository.save(progress);
    }
}
