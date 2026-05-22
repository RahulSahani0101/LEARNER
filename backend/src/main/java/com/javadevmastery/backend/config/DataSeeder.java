package com.javadevmastery.backend.config;

import com.javadevmastery.backend.common.Role;
import com.javadevmastery.backend.gamification.*;
import com.javadevmastery.backend.learning.*;
import com.javadevmastery.backend.user.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final TopicRepository topicRepository;
    private final TopicProgressRepository topicProgressRepository;
    private final QuestionRepository questionRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final DailyActivityRepository dailyActivityRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            TopicRepository topicRepository,
            TopicProgressRepository topicProgressRepository,
            QuestionRepository questionRepository,
            CodingProblemRepository codingProblemRepository,
            BadgeRepository badgeRepository,
            UserBadgeRepository userBadgeRepository,
            DailyActivityRepository dailyActivityRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.topicRepository = topicRepository;
        this.topicProgressRepository = topicProgressRepository;
        this.questionRepository = questionRepository;
        this.codingProblemRepository = codingProblemRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.dailyActivityRepository = dailyActivityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User admin = userRepository.save(User.builder()
                .fullName("Admin Mentor")
                .email("admin@javadevmastery.com")
                .passwordHash(passwordEncoder.encode("Password@123"))
                .role(Role.ROLE_ADMIN)
                .active(true)
                .createdAt(Instant.now())
                .build());

        User demo = userRepository.save(User.builder()
                .fullName("Rahul Sahani")
                .email("demo@javadevmastery.com")
                .passwordHash(passwordEncoder.encode("Password@123"))
                .role(Role.ROLE_USER)
                .active(true)
                .createdAt(Instant.now())
                .build());

        User test = userRepository.save(User.builder()
                .fullName("Test Learner")
                .email("test@javadevmastery.com")
                .passwordHash(passwordEncoder.encode("Password@123"))
                .role(Role.ROLE_USER)
                .active(true)
                .createdAt(Instant.now())
                .build());

        userProfileRepository.save(UserProfile.builder().user(admin).xp(2500).level(4).streakDays(11).streakFreezes(1).build());
        userProfileRepository.save(UserProfile.builder().user(demo).xp(1250).level(4).streakDays(5).streakFreezes(1).build());
        userProfileRepository.save(UserProfile.builder().user(test).xp(300).level(1).streakDays(1).streakFreezes(0).build());

        List<Topic> topics = seedTopics();
        seedQuestions(topics);
        seedCodingProblems();
        List<Badge> badges = seedBadges();
        seedDemoProgress(demo, topics, badges);
        seedRecentActivity(demo);
    }

    private List<Topic> seedTopics() {
        List<Topic> topics = List.of(
                topic("jvm-architecture", "JVM Architecture", TopicCategory.JAVA_CORE, 45, 1),
                topic("java-strings", "String Internals and Immutability", TopicCategory.JAVA_CORE, 35, 2),
                topic("oop-pillars", "OOP Pillars in Enterprise Java", TopicCategory.OOP, 50, 3),
                topic("collections-internals", "Collections Internals", TopicCategory.COLLECTIONS, 55, 4),
                topic("generics", "Generics and Type Safety", TopicCategory.JAVA_CORE, 35, 5),
                topic("streams-lambda", "Streams and Lambda Patterns", TopicCategory.JAVA_8_PLUS, 40, 6),
                topic("exceptions", "Exception Handling Strategy", TopicCategory.EXCEPTIONS, 30, 7),
                topic("multithreading-core", "Multithreading Fundamentals", TopicCategory.MULTITHREADING, 50, 8),
                topic("executorservice", "ExecutorService and Futures", TopicCategory.MULTITHREADING, 35, 9),
                topic("spring-di", "Spring IoC and Dependency Injection", TopicCategory.SPRING_BOOT, 45, 10),
                topic("spring-rest", "REST API Design in Spring Boot", TopicCategory.SPRING_BOOT, 45, 11),
                topic("spring-jpa", "Spring Data JPA for Production", TopicCategory.SPRING_BOOT, 55, 12),
                topic("spring-security-jwt", "Spring Security with JWT", TopicCategory.SPRING_BOOT, 60, 13),
                topic("sql-joins", "SQL Joins and Aggregations", TopicCategory.SQL, 40, 14),
                topic("sql-indexes", "Indexes and Query Optimization", TopicCategory.SQL, 35, 15),
                topic("dsa-arrays", "Arrays and Two Pointers", TopicCategory.DSA, 50, 16),
                topic("dsa-linked-list", "Linked List Patterns", TopicCategory.DSA, 40, 17),
                topic("dsa-binary-search", "Binary Search Patterns", TopicCategory.DSA, 35, 18),
                topic("dsa-trees", "Binary Tree Traversals", TopicCategory.DSA, 50, 19),
                topic("dsa-hashmap", "HashMap Interview Patterns", TopicCategory.DSA, 45, 20)
        );

        return topicRepository.saveAll(topics);
    }

    private void seedQuestions(List<Topic> topics) {
        List<Question> questions = new ArrayList<>();
        for (Topic topic : topics) {
            for (int i = 1; i <= 6; i += 1) {
                questions.add(Question.builder()
                        .topic(topic)
                        .type(switch (i % 4) {
                            case 0 -> QuestionType.MCQ;
                            case 1 -> QuestionType.CODE_OUTPUT;
                            case 2 -> QuestionType.FILL_BLANK;
                            default -> QuestionType.DEBUG;
                        })
                        .prompt("[" + topic.getTitle() + "] Question " + i + ": Choose the best engineering answer for maintainable Java code.")
                        .optionA("Option A")
                        .optionB("Option B")
                        .optionC("Option C")
                        .optionD("Option D")
                        .correctOption("B")
                        .explanation("Option B aligns with production-grade readability, testing, and performance tradeoffs for " + topic.getTitle() + ".")
                        .build());
            }
        }
        questionRepository.saveAll(questions);
    }

    private List<Badge> seedBadges() {
        List<Badge> badges = List.of(
                badge("FIRST_STEP", "First Step", BadgeRarity.COMMON, "Complete first topic"),
                badge("QUIZ_MASTER", "Quiz Master", BadgeRarity.RARE, "Pass 10 quizzes"),
                badge("CONSISTENCY_KING", "Consistency King", BadgeRarity.RARE, "Maintain 7-day streak"),
                badge("ON_FIRE", "On Fire", BadgeRarity.EPIC, "Maintain 30-day streak"),
                badge("SPEEDSTER", "Speedster", BadgeRarity.RARE, "Complete quiz under 5 minutes"),
                badge("PERFECTIONIST", "Perfectionist", BadgeRarity.EPIC, "100 percent in 5 quizzes"),
                badge("DSA_WARRIOR", "DSA Warrior", BadgeRarity.EPIC, "Solve 50 DSA problems"),
                badge("JAVA_CHAMPION", "Java Champion", BadgeRarity.LEGENDARY, "Reach level 10"),
                badge("NIGHT_OWL", "Night Owl", BadgeRarity.COMMON, "Study after 11 PM"),
                badge("INTERVIEW_READY", "Interview Ready", BadgeRarity.LEGENDARY, "Complete all interview tracks")
        );

        return badgeRepository.saveAll(badges);
    }

    private void seedCodingProblems() {
        List<CodingProblem> problems = List.of(
                problem("Two Sum", Difficulty.EASY, "Given an array and target, return two indices whose values add to target."),
                problem("Valid Parentheses", Difficulty.EASY, "Validate if parentheses are balanced using stack logic."),
                problem("Merge Two Sorted Lists", Difficulty.EASY, "Merge two sorted linked lists and return a sorted list."),
                problem("Maximum Subarray", Difficulty.EASY, "Find contiguous subarray with maximum sum."),
                problem("LRU Cache", Difficulty.MEDIUM, "Design an LRU cache with O(1) get and put."),
                problem("Top K Frequent Elements", Difficulty.MEDIUM, "Return top k frequent elements in an array."),
                problem("Binary Tree Right Side View", Difficulty.MEDIUM, "Return visible nodes from right side of binary tree."),
                problem("Longest Substring Without Repeating Characters", Difficulty.MEDIUM, "Find length of longest substring without duplicate characters."),
                problem("Word Ladder", Difficulty.HARD, "Transform begin word to end word using BFS over dictionary."),
                problem("Median of Two Sorted Arrays", Difficulty.HARD, "Find median in O(log(min(m,n))).")
        );

        codingProblemRepository.saveAll(problems);
    }

    private void seedDemoProgress(User demo, List<Topic> topics, List<Badge> badges) {
        List<TopicProgress> progressList = new ArrayList<>();
        for (int i = 0; i < 8; i += 1) {
            Topic topic = topics.get(i);
            int completion = i < 3 ? 100 : (i < 6 ? 55 : 20);
            progressList.add(TopicProgress.builder()
                    .user(demo)
                    .topic(topic)
                    .completionPercent(completion)
                    .completed(completion == 100)
                    .lastActiveDate(LocalDate.now().minusDays(8 - i))
                    .build());
        }
        topicProgressRepository.saveAll(progressList);

        userBadgeRepository.save(UserBadge.builder().user(demo).badge(badges.get(0)).earnedAt(Instant.now().minusSeconds(86400L * 20)).build());
        userBadgeRepository.save(UserBadge.builder().user(demo).badge(badges.get(1)).earnedAt(Instant.now().minusSeconds(86400L * 8)).build());
        userBadgeRepository.save(UserBadge.builder().user(demo).badge(badges.get(2)).earnedAt(Instant.now().minusSeconds(86400L * 2)).build());
    }

    private void seedRecentActivity(User demo) {
        for (int i = 0; i < 5; i += 1) {
            dailyActivityRepository.save(DailyActivity.builder()
                    .user(demo)
                    .activityDate(LocalDate.now().minusDays(i))
                    .activityType(i % 2 == 0 ? "LESSON" : "QUIZ")
                    .build());
        }
    }

    private Topic topic(String slug, String title, TopicCategory category, int minutes, int orderIndex) {
        String summary = switch (category) {
            case JAVA_CORE -> "Master " + title + " to explain JVM-level behavior in interviews and design robust backend logic with confidence.";
            case OOP -> "Use " + title + " to convert requirements into maintainable class design and scalable service boundaries.";
            case COLLECTIONS -> "Understand " + title + " deeply to choose correct data structures for performance-critical APIs.";
            case JAVA_8_PLUS -> "Apply " + title + " for concise code, safer null handling, and cleaner functional transformations.";
            case EXCEPTIONS -> "Build resilient applications by applying " + title + " with meaningful error contracts and traceability.";
            case MULTITHREADING -> "Use " + title + " to build responsive systems while avoiding race conditions and deadlocks.";
            case SPRING_BOOT -> "Learn " + title + " to deliver production-grade REST services with layered architecture and security.";
            case SQL -> "Practice " + title + " to optimize queries and reason about data correctness under real workloads.";
            case DSA -> "Strengthen " + title + " to crack coding rounds with pattern-based problem-solving speed.";
        };

        return Topic.builder()
                .slug(slug)
                .title(title)
                .category(category)
                .summary(summary)
                .estimatedMinutes(minutes)
                .orderIndex(orderIndex)
                .build();
    }

    private Badge badge(String code, String title, BadgeRarity rarity, String trigger) {
        return Badge.builder().code(code).title(title).rarity(rarity).triggerCondition(trigger).build();
    }

    private CodingProblem problem(String title, Difficulty difficulty, String statement) {
        String starterCode = """
                public class Solution {
                    public static void solve() {
                        System.out.println("Write your approach and validate with test cases.");
                    }
                }
                """;
        return CodingProblem.builder()
                .title(title)
                .difficulty(difficulty)
                .statement(statement)
                .starterCode(starterCode)
                .build();
    }
}
