package com.javadevmastery.backend.gamification;

import com.javadevmastery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "xp_history")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class XpHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int points;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private Instant awardedAt;
}
