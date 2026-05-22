package com.javadevmastery.backend.gamification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyActivityRepository extends JpaRepository<DailyActivity, Long> {
    List<DailyActivity> findByUserId(Long userId);
    boolean existsByUserIdAndActivityDate(Long userId, LocalDate activityDate);
}
