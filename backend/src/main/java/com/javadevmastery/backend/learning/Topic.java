package com.javadevmastery.backend.learning;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "topics")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TopicCategory category;

    @Column(nullable = false, length = 3000)
    private String summary;

    @Column(nullable = false)
    private int estimatedMinutes;

    @Column(nullable = false)
    private int orderIndex;
}
