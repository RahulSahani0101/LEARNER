package com.javadevmastery.backend.learning;

import com.javadevmastery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookmarks", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "topic_id"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;
}
