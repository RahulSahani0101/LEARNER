package com.javadevmastery.backend.gamification;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "badges")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BadgeRarity rarity;

    @Column(nullable = false)
    private String triggerCondition;
}
