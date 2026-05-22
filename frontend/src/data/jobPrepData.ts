import type { DashboardData, TopicCard } from "../types";

export const fallbackTopics: TopicCard[] = [
  { id: 1, slug: "jvm-architecture", title: "JVM Architecture", category: "JAVA_CORE", summary: "JVM memory model, class loading, and GC tradeoffs asked in backend interviews.", estimatedMinutes: 45, orderIndex: 1, completionPercent: 30, completed: false },
  { id: 2, slug: "java-strings", title: "String Internals and Immutability", category: "JAVA_CORE", summary: "String pool, immutability, and performance choices in request-heavy services.", estimatedMinutes: 35, orderIndex: 2, completionPercent: 20, completed: false },
  { id: 3, slug: "oop-pillars", title: "OOP Pillars in Enterprise Java", category: "OOP", summary: "Encapsulation and abstraction patterns for maintainable service-layer code.", estimatedMinutes: 50, orderIndex: 3, completionPercent: 10, completed: false },
  { id: 4, slug: "collections-internals", title: "Collections Internals", category: "COLLECTIONS", summary: "HashMap, ArrayList, and ConcurrentHashMap behavior under load.", estimatedMinutes: 55, orderIndex: 4, completionPercent: 0, completed: false },
  { id: 5, slug: "generics", title: "Generics and Type Safety", category: "JAVA_CORE", summary: "Avoid runtime casting bugs using bounded generics and clean APIs.", estimatedMinutes: 35, orderIndex: 5, completionPercent: 0, completed: false },
  { id: 6, slug: "streams-lambda", title: "Streams and Lambda Patterns", category: "JAVA_8_PLUS", summary: "Functional transformations with readable, testable pipelines.", estimatedMinutes: 40, orderIndex: 6, completionPercent: 0, completed: false },
  { id: 7, slug: "exceptions", title: "Exception Handling Strategy", category: "EXCEPTIONS", summary: "Standardized error handling, custom exceptions, and API contracts.", estimatedMinutes: 30, orderIndex: 7, completionPercent: 0, completed: false },
  { id: 8, slug: "multithreading-core", title: "Multithreading Fundamentals", category: "MULTITHREADING", summary: "Thread lifecycle, synchronization, and race-condition debugging.", estimatedMinutes: 50, orderIndex: 8, completionPercent: 0, completed: false },
  { id: 9, slug: "executorservice", title: "ExecutorService and Futures", category: "MULTITHREADING", summary: "Thread pools and async orchestration in real APIs.", estimatedMinutes: 35, orderIndex: 9, completionPercent: 0, completed: false },
  { id: 10, slug: "spring-di", title: "Spring IoC and Dependency Injection", category: "SPRING_BOOT", summary: "Bean scopes, DI patterns, and test-friendly architecture.", estimatedMinutes: 45, orderIndex: 10, completionPercent: 0, completed: false },
  { id: 11, slug: "spring-rest", title: "REST API Design in Spring Boot", category: "SPRING_BOOT", summary: "Resource modeling, status codes, and pagination basics.", estimatedMinutes: 45, orderIndex: 11, completionPercent: 0, completed: false },
  { id: 12, slug: "spring-jpa", title: "Spring Data JPA for Production", category: "SPRING_BOOT", summary: "Entity modeling, transactions, and N+1 query prevention.", estimatedMinutes: 55, orderIndex: 12, completionPercent: 0, completed: false },
  { id: 13, slug: "spring-security-jwt", title: "Spring Security with JWT", category: "SPRING_BOOT", summary: "Authentication flow, token expiry, refresh strategy, and RBAC.", estimatedMinutes: 60, orderIndex: 13, completionPercent: 0, completed: false },
  { id: 14, slug: "sql-joins", title: "SQL Joins and Aggregations", category: "SQL", summary: "Join types, grouping, and data-shape reasoning for APIs.", estimatedMinutes: 40, orderIndex: 14, completionPercent: 0, completed: false },
  { id: 15, slug: "sql-indexes", title: "Indexes and Query Optimization", category: "SQL", summary: "EXPLAIN plans, selective indexes, and latency reduction.", estimatedMinutes: 35, orderIndex: 15, completionPercent: 0, completed: false },
  { id: 16, slug: "dsa-arrays", title: "Arrays and Two Pointers", category: "DSA", summary: "Sliding-window and two-pointer templates for coding rounds.", estimatedMinutes: 50, orderIndex: 16, completionPercent: 0, completed: false },
  { id: 17, slug: "dsa-linked-list", title: "Linked List Patterns", category: "DSA", summary: "Fast-slow pointer, reversal, and merge techniques.", estimatedMinutes: 40, orderIndex: 17, completionPercent: 0, completed: false },
  { id: 18, slug: "dsa-binary-search", title: "Binary Search Patterns", category: "DSA", summary: "Lower/upper bound, answer-space search, and edge cases.", estimatedMinutes: 35, orderIndex: 18, completionPercent: 0, completed: false },
  { id: 19, slug: "dsa-trees", title: "Binary Tree Traversals", category: "DSA", summary: "DFS/BFS traversals and recursion vs iterative tradeoffs.", estimatedMinutes: 50, orderIndex: 19, completionPercent: 0, completed: false },
  { id: 20, slug: "dsa-hashmap", title: "HashMap Interview Patterns", category: "DSA", summary: "Frequency maps and lookup optimizations in linear-time problems.", estimatedMinutes: 45, orderIndex: 20, completionPercent: 0, completed: false },
];

export const fallbackDashboard: DashboardData = {
  xp: 1540,
  level: 4,
  streakDays: 6,
  completedTopics: 4,
  startedTopics: 9,
  recommendedTopics: fallbackTopics.slice(0, 5),
  weeklyConsistency: [
    { day: "Mon", minutes: 55 },
    { day: "Tue", minutes: 70 },
    { day: "Wed", minutes: 45 },
    { day: "Thu", minutes: 80 },
    { day: "Fri", minutes: 60 },
    { day: "Sat", minutes: 95 },
    { day: "Sun", minutes: 40 },
  ],
};

export interface DsaQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
  approach: string;
  complexity: string;
  javaHint: string;
}

export interface DsaTrack {
  id: string;
  title: string;
  target: string;
  weeklyGoal: string;
  patterns: string[];
  questions: DsaQuestion[];
}

export const dsaTracks: DsaTrack[] = [
  {
    id: "arrays-two-pointers",
    title: "Arrays and Two Pointers",
    target: "Round 1 coding speed",
    weeklyGoal: "Solve 8 questions and re-solve 4 without notes.",
    patterns: ["Opposite pointers", "Sliding window", "In-place overwrite", "Prefix sum"],
    questions: [
      {
        id: "arr-1",
        title: "Two Sum",
        difficulty: "Easy",
        prompt: "Return indexes of two numbers that add up to target.",
        approach: "Use HashMap<value, index>. For each num, check if target-num exists before inserting current value.",
        complexity: "Time O(n), Space O(n)",
        javaHint: "Map<Integer, Integer> seen = new HashMap<>();",
      },
      {
        id: "arr-2",
        title: "Container With Most Water",
        difficulty: "Medium",
        prompt: "Find max area from vertical lines.",
        approach: "Use two pointers; compute area and move the shorter wall because only that can improve min-height.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "while (left < right) { ... if (h[left] < h[right]) left++; else right--; }",
      },
      {
        id: "arr-3",
        title: "3Sum",
        difficulty: "Medium",
        prompt: "Find unique triplets that sum to zero.",
        approach: "Sort then fix i and run left-right two pointer. Skip duplicates on i, left and right.",
        complexity: "Time O(n^2), Space O(1) excluding output",
        javaHint: "Arrays.sort(nums);",
      },
      {
        id: "arr-4",
        title: "Minimum Size Subarray Sum",
        difficulty: "Medium",
        prompt: "Find smallest length subarray with sum >= target.",
        approach: "Sliding window expand right, shrink left while sum >= target and track min length.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "for (int right = 0; right < n; right++) { ... while (sum >= target) { ... left++; } }",
      },
    ],
  },
  {
    id: "linked-list",
    title: "Linked List Mastery",
    target: "Common service interview warmup",
    weeklyGoal: "Solve 6 linked-list problems in one timed session.",
    patterns: ["Fast/slow pointer", "In-place reversal", "Dummy node", "Merge strategy"],
    questions: [
      {
        id: "ll-1",
        title: "Reverse Linked List",
        difficulty: "Easy",
        prompt: "Reverse a singly linked list iteratively.",
        approach: "Track prev/curr/next; redirect curr.next to prev and move pointers forward.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "ListNode prev = null, curr = head;",
      },
      {
        id: "ll-2",
        title: "Linked List Cycle",
        difficulty: "Easy",
        prompt: "Detect if a cycle exists.",
        approach: "Use fast and slow pointers; if they meet, cycle exists.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "while (fast != null && fast.next != null)",
      },
      {
        id: "ll-3",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        prompt: "Merge two sorted lists and return head.",
        approach: "Use dummy head and always attach smaller node pointer.",
        complexity: "Time O(n+m), Space O(1)",
        javaHint: "ListNode dummy = new ListNode(-1);",
      },
      {
        id: "ll-4",
        title: "Remove Nth Node from End",
        difficulty: "Medium",
        prompt: "Remove nth node from end in one pass.",
        approach: "Use dummy + fast/slow; move fast n+1 steps, then move both until fast null.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "fast = dummy; slow = dummy;",
      },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search Patterns",
    target: "Mid-level coding round",
    weeklyGoal: "Finish 10 boundary-focused problems.",
    patterns: ["Lower bound", "Upper bound", "Rotated array", "Answer-space search"],
    questions: [
      {
        id: "bs-1",
        title: "Binary Search",
        difficulty: "Easy",
        prompt: "Return index of target in sorted array.",
        approach: "Maintain inclusive low/high. Avoid overflow with low + (high-low)/2.",
        complexity: "Time O(log n), Space O(1)",
        javaHint: "int mid = low + (high - low) / 2;",
      },
      {
        id: "bs-2",
        title: "Find First and Last Position",
        difficulty: "Medium",
        prompt: "Find first and last index of target.",
        approach: "Run two binary searches: first occurrence and last occurrence.",
        complexity: "Time O(log n), Space O(1)",
        javaHint: "Separate helper for boundary search.",
      },
      {
        id: "bs-3",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        prompt: "Search target in rotated array.",
        approach: "Detect sorted half at each step and narrow range where target can lie.",
        complexity: "Time O(log n), Space O(1)",
        javaHint: "if (nums[left] <= nums[mid]) { ... }",
      },
      {
        id: "bs-4",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        prompt: "Find min eating speed within h hours.",
        approach: "Binary search answer-space on speed and validate feasibility.",
        complexity: "Time O(n log maxPile), Space O(1)",
        javaHint: "hours += (pile + speed - 1) / speed;",
      },
    ],
  },
  {
    id: "trees-graphs",
    title: "Trees and Graphs",
    target: "Round 2 depth check",
    weeklyGoal: "Solve 7 tree/graph questions with dry runs.",
    patterns: ["DFS recursion", "BFS queue", "Level order", "Visited set"],
    questions: [
      {
        id: "tg-1",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        prompt: "Return node values level by level.",
        approach: "Use queue, process one level size at a time.",
        complexity: "Time O(n), Space O(n)",
        javaHint: "Queue<TreeNode> queue = new LinkedList<>();",
      },
      {
        id: "tg-2",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        prompt: "Find depth of tree.",
        approach: "Recursive depth = 1 + max(leftDepth, rightDepth).",
        complexity: "Time O(n), Space O(h)",
        javaHint: "if (root == null) return 0;",
      },
      {
        id: "tg-3",
        title: "Number of Islands",
        difficulty: "Medium",
        prompt: "Count connected components in 2D grid.",
        approach: "Iterate grid and DFS/BFS flood-fill each unvisited land cell.",
        complexity: "Time O(m*n), Space O(m*n)",
        javaHint: "mark visited by mutating grid or boolean[][].",
      },
      {
        id: "tg-4",
        title: "Course Schedule",
        difficulty: "Medium",
        prompt: "Check if all courses can be completed.",
        approach: "Use topological sort (Kahn's algorithm) with in-degree count.",
        complexity: "Time O(V+E), Space O(V+E)",
        javaHint: "Queue<Integer> zeroIndegree = new LinkedList<>();",
      },
    ],
  },
  {
    id: "heap-greedy",
    title: "Heap and Greedy",
    target: "Optimization and throughput tasks",
    weeklyGoal: "Solve 6 medium questions under 35 minutes each.",
    patterns: ["Top-K", "Min heap window", "Greedy choice proof", "Sort by key"],
    questions: [
      {
        id: "hg-1",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        prompt: "Return k most frequent numbers.",
        approach: "Count frequencies, push entries into min-heap of size k.",
        complexity: "Time O(n log k), Space O(n)",
        javaHint: "PriorityQueue<Map.Entry<Integer, Integer>> pq = ...",
      },
      {
        id: "hg-2",
        title: "Kth Largest Element",
        difficulty: "Medium",
        prompt: "Find kth largest in array.",
        approach: "Maintain min-heap size k; top of heap is kth largest.",
        complexity: "Time O(n log k), Space O(k)",
        javaHint: "if (pq.size() > k) pq.poll();",
      },
      {
        id: "hg-3",
        title: "Task Scheduler",
        difficulty: "Medium",
        prompt: "Minimum intervals to finish tasks with cooldown.",
        approach: "Count max frequency and compute idle slots formula.",
        complexity: "Time O(n), Space O(1) for fixed alphabets",
        javaHint: "Math.max(tasks.length, (maxFreq-1)*(n+1)+maxCount);",
      },
      {
        id: "hg-4",
        title: "Meeting Rooms II",
        difficulty: "Medium",
        prompt: "Find minimum meeting rooms required.",
        approach: "Sort by start time and track end times in min-heap.",
        complexity: "Time O(n log n), Space O(n)",
        javaHint: "if (start >= pq.peek()) pq.poll();",
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    target: "Offer-deciding hard section",
    weeklyGoal: "Master 5 core DP templates this month.",
    patterns: ["1D DP", "2D DP", "State transition", "Memoization"],
    questions: [
      {
        id: "dp-1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        prompt: "Count ways to reach nth stair.",
        approach: "Classic Fibonacci relation dp[i] = dp[i-1] + dp[i-2].",
        complexity: "Time O(n), Space O(1)",
        javaHint: "Use rolling variables prev2, prev1.",
      },
      {
        id: "dp-2",
        title: "House Robber",
        difficulty: "Medium",
        prompt: "Max loot without robbing adjacent houses.",
        approach: "Transition: take = prev2 + nums[i], skip = prev1.",
        complexity: "Time O(n), Space O(1)",
        javaHint: "curr = Math.max(prev1, prev2 + num);",
      },
      {
        id: "dp-3",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        prompt: "Find length of LCS of two strings.",
        approach: "2D DP by matching chars and carrying best previous value.",
        complexity: "Time O(m*n), Space O(m*n)",
        javaHint: "dp[i][j] = a[i-1]==b[j-1] ? 1+dp[i-1][j-1] : Math.max(dp[i-1][j], dp[i][j-1]);",
      },
      {
        id: "dp-4",
        title: "Coin Change",
        difficulty: "Medium",
        prompt: "Find minimum coins to make amount.",
        approach: "1D DP where dp[a] = min(dp[a], dp[a-coin]+1).",
        complexity: "Time O(amount * coins), Space O(amount)",
        javaHint: "Initialize with amount+1 as INF.",
      },
    ],
  },
];

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  whatInterviewersCheck: string;
}

export interface InterviewSection {
  id: string;
  title: string;
  description: string;
  questions: InterviewQuestion[];
}

export const interviewSections: InterviewSection[] = [
  {
    id: "java-spring",
    title: "Java + Spring Boot",
    description: "High-frequency backend questions for 1-2 year roles.",
    questions: [
      {
        id: "js-1",
        question: "How does Spring Boot auto-configuration work?",
        answer: "Spring Boot checks classpath + beans + properties and conditionally creates beans with @Conditional annotations. It reduces manual setup but can be overridden by defining your own beans.",
        whatInterviewersCheck: "Framework depth and ability to debug startup configuration.",
      },
      {
        id: "js-2",
        question: "Why use JWT + refresh token instead of only session?",
        answer: "JWT keeps APIs stateless and scales horizontally. Short-lived access token limits exposure; refresh token renews access securely. The backend should validate signature, expiry, and rotate refresh tokens.",
        whatInterviewersCheck: "Security understanding and API scalability mindset.",
      },
      {
        id: "js-3",
        question: "How do you avoid N+1 query issue in JPA?",
        answer: "Use fetch joins, EntityGraph, batch size tuning, and query-specific DTO projections. Also monitor SQL logs and performance before and after optimization.",
        whatInterviewersCheck: "Performance diagnosis and ORM practical experience.",
      },
      {
        id: "js-4",
        question: "How would you design global exception handling?",
        answer: "Use @RestControllerAdvice with typed handlers, return consistent error schema, map domain errors to proper HTTP codes, and include trace-safe diagnostic info.",
        whatInterviewersCheck: "Production readiness and API contract discipline.",
      },
    ],
  },
  {
    id: "sql",
    title: "SQL and Database",
    description: "Questions often asked for service/data-heavy teams.",
    questions: [
      {
        id: "sql-1",
        question: "When will an index hurt performance?",
        answer: "Excess indexes slow inserts/updates/deletes and increase storage. Low-selectivity indexes are often ignored by query planner. Index only real query patterns.",
        whatInterviewersCheck: "Tradeoff awareness, not textbook-only knowledge.",
      },
      {
        id: "sql-2",
        question: "INNER JOIN vs LEFT JOIN?",
        answer: "INNER JOIN returns only matched rows. LEFT JOIN returns all rows from left table and nulls for unmatched right rows. Choice depends on required data completeness.",
        whatInterviewersCheck: "Data correctness under business requirements.",
      },
      {
        id: "sql-3",
        question: "How do you debug a slow SQL query?",
        answer: "Use EXPLAIN plan, verify indexes, check cardinality/selectivity, avoid function calls on indexed columns, and reduce transferred columns/rows.",
        whatInterviewersCheck: "Practical troubleshooting process.",
      },
    ],
  },
  {
    id: "behavioral",
    title: "Behavioral and Ownership",
    description: "Stories that help justify 12 LPA-level confidence.",
    questions: [
      {
        id: "bh-1",
        question: "Tell me about a tough bug you fixed.",
        answer: "Describe incident, impact, logs/traces used, root cause, fix, and prevention (tests/alerts). Keep a measurable outcome: reduced error rate or response time.",
        whatInterviewersCheck: "Debugging maturity and ownership.",
      },
      {
        id: "bh-2",
        question: "How do you handle conflicting priorities?",
        answer: "Reconfirm scope and deadline, break work by impact/risk, communicate tradeoffs early, and deliver highest-value slice first with clear status updates.",
        whatInterviewersCheck: "Communication and execution discipline.",
      },
      {
        id: "bh-3",
        question: "Why this role in Noida?",
        answer: "Align your backend growth goals, local market opportunities, product ownership preference, and focus on long-term contribution in Java/Spring stack.",
        whatInterviewersCheck: "Intent clarity and retention signal.",
      },
    ],
  },
];

export interface AIMentorPlaybook {
  trigger: string[];
  response: string;
  nextSteps: string[];
}

export const aiMentorPlaybooks: AIMentorPlaybook[] = [
  {
    trigger: ["jwt", "token", "refresh", "401"],
    response: "Your auth issue looks like token lifecycle drift. Validate expiry handling, refresh endpoint behavior, and header attachment order in interceptors.",
    nextSteps: [
      "Check if access token is actually sent in Authorization header.",
      "Confirm refresh endpoint returns a new access token and it is persisted.",
      "Retry original request only once after refresh to avoid infinite loops.",
    ],
  },
  {
    trigger: ["dashboard", "api failed", "request failed", "500"],
    response: "This looks like a backend dependency or profile issue. Fall back to safe UI data and inspect backend logs for missing seed/profile records.",
    nextSteps: [
      "Hit /actuator/health and confirm status UP.",
      "Check server profile (`dev` vs `mysql`) and DB connectivity.",
      "Ensure demo user profile rows exist for dashboard aggregations.",
    ],
  },
  {
    trigger: ["dsa", "coding", "leetcode", "problem"],
    response: "For DSA interview speed, shift from random solving to pattern blocks and timed re-attempts.",
    nextSteps: [
      "Pick one pattern, solve 3 easy + 2 medium in a single sitting.",
      "Write a 3-line approach before coding.",
      "Re-solve failed questions after 48 hours without seeing solution.",
    ],
  },
  {
    trigger: ["resume", "project", "experience"],
    response: "Your resume should show outcomes, not only responsibilities. Convert tasks into impact bullets with metrics.",
    nextSteps: [
      "Use action + system + metric format for each bullet.",
      "Add one bug-fix case and one optimization case from this project.",
      "Map each project bullet to job description keywords (Spring Boot, JPA, REST, SQL).",
    ],
  },
];

export interface ProjectBlueprint {
  id: string;
  title: string;
  outcome: string;
  stack: string[];
  milestones: string[];
}

export const projectBlueprints: ProjectBlueprint[] = [
  {
    id: "p1",
    title: "Secure Learning Platform API",
    outcome: "Demonstrate auth, RBAC, and production-grade REST design.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "MySQL"],
    milestones: [
      "Implement login + refresh token rotation",
      "Add role-based admin endpoints",
      "Create integration tests for auth and protected routes",
      "Deploy and expose health/metrics endpoints",
    ],
  },
  {
    id: "p2",
    title: "Query Optimization Playground",
    outcome: "Show SQL tuning and latency reduction skills.",
    stack: ["Spring Data JPA", "MySQL", "EXPLAIN", "Indexing"],
    milestones: [
      "Capture baseline query timings",
      "Apply index strategy and fetch joins",
      "Publish before/after performance report",
      "Add regression tests for repository queries",
    ],
  },
  {
    id: "p3",
    title: "Interview Simulator Board",
    outcome: "Build a mock interview + scoring + feedback workflow.",
    stack: ["React", "TypeScript", "Spring Boot", "JWT"],
    milestones: [
      "Create timed question modules",
      "Store attempts and generate readiness score",
      "Add skill-gap feedback engine",
      "Publish demo video and architecture doc",
    ],
  },
];

export interface CommunityItem {
  id: string;
  title: string;
  schedule: string;
  format: string;
}

export const communityItems: CommunityItem[] = [
  { id: "c1", title: "Spring Boot Bug-Fix Circle", schedule: "Tue 8:00 PM IST", format: "Live debugging with code review" },
  { id: "c2", title: "DSA Timed Drill Group", schedule: "Thu 7:30 PM IST", format: "45-min problem sprint + discussion" },
  { id: "c3", title: "Mock Interview Panel", schedule: "Sat 10:00 AM IST", format: "Peer interview + structured feedback" },
];
