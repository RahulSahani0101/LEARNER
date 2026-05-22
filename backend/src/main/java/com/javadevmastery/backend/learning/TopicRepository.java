package com.javadevmastery.backend.learning;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    Optional<Topic> findBySlug(String slug);
    List<Topic> findAllByOrderByOrderIndexAsc();
}
