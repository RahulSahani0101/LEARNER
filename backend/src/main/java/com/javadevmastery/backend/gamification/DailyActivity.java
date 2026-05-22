package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "daily_activity", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "activity_date"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(nullable = false)
    private String activityType;
}
