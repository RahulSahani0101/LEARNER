package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "topic_progress", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "topic_id"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false)
    private boolean completed;

    @Column(nullable = false)
    private int completionPercent;

    @Column(nullable = false)
    private LocalDate lastActiveDate;
}
