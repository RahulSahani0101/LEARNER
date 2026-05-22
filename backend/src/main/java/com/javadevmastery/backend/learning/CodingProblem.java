package com.javadevmastery.backend.learning;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coding_problems")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false, length = 3000)
    private String statement;

    @Column(nullable = false)
    private String starterCode;
}
