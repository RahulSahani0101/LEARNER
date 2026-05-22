export type Role = "ROLE_ADMIN" | "ROLE_USER";

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface TopicCard {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  estimatedMinutes: number;
  orderIndex: number;
  completionPercent: number;
  completed: boolean;
}

export interface TopicDetail {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  estimatedMinutes: number;
  interviewPoints: string[];
  commonMistakes: string[];
  practiceProblems: string[];
}

export interface DashboardPoint {
  day: string;
  minutes: number;
}

export interface DashboardData {
  xp: number;
  level: number;
  streakDays: number;
  completedTopics: number;
  startedTopics: number;
  recommendedTopics: TopicCard[];
  weeklyConsistency: DashboardPoint[];
}

export interface QuizQuestion {
  id: number;
  type: string;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface SubmitQuizRequest {
  topicId: number;
  answers: Array<{
    questionId: number;
    selectedOptionIndex: number;
  }>;
}

export interface SubmitQuizResponse {
  score: number;
  total: number;
  passed: boolean;
  xpAwarded: number;
}
