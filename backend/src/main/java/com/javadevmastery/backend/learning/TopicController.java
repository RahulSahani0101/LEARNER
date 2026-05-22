package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.common.ApiResponse;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ApiResponse<List<TopicCardDto>> topics() {
        return ApiResponse.ok("Topics fetched", topicService.getTopicCards());
    }

    @GetMapping("/{slug}")
    public ApiResponse<TopicDetailDto> topicBySlug(@PathVariable String slug) {
        return ApiResponse.ok("Topic fetched", topicService.getTopicDetail(slug));
    }

    @PatchMapping("/{topicId}/progress")
    public ApiResponse<Void> updateProgress(
            @PathVariable Long topicId,
            @RequestParam @Min(0) @Max(100) int completion
    ) {
        topicService.markTopicProgress(topicId, completion);
        return ApiResponse.ok("Progress updated", null);
    }
}
