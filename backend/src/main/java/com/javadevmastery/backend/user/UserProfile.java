package com.javadevmastery.backend.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private int xp;

    @Column(nullable = false)
    private int level;

    @Column(nullable = false)
    private int streakDays;

    @Column(nullable = false)
    private int streakFreezes;
}
