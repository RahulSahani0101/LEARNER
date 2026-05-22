package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coding_problem_id", nullable = false)
    private CodingProblem codingProblem;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false, length = 8000)
    private String sourceCode;

    @Column(nullable = false)
    private boolean passed;

    @Column(nullable = false)
    private Instant submittedAt;
}
