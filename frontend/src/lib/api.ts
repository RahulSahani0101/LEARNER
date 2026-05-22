import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiEnvelope, AuthPayload, DashboardData, QuizQuestion, Role, SubmitQuizRequest, SubmitQuizResponse, TopicCard, TopicDetail } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";
const ACCESS_TOKEN_KEY = "jdm_access_token";
const REFRESH_TOKEN_KEY = "jdm_refresh_token";
const SESSION_META_KEY = "jdm_session_meta";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

interface SessionMeta {
  email: string;
  fullName: string;
  role: Role;
}

/**
 * Returns the current access token from browser storage.
 */
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Returns the current refresh token from browser storage.
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Persists the latest access and refresh token pair.
 */
export function persistTokens(auth: Pick<AuthPayload, "accessToken" | "refreshToken">): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
}

/**
 * Persists non-token profile data required for guarded routes and profile UI.
 */
export function persistSessionMeta(auth: Pick<AuthPayload, "email" | "fullName" | "role">): void {
  const payload: SessionMeta = {
    email: auth.email,
    fullName: auth.fullName,
    role: auth.role,
  };

  localStorage.setItem(SESSION_META_KEY, JSON.stringify(payload));
}

/**
 * Returns persisted profile metadata if available.
 */
export function getSessionMeta(): SessionMeta | null {
  const rawValue = localStorage.getItem(SESSION_META_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as SessionMeta;
    if (!parsedValue.email || !parsedValue.fullName || !parsedValue.role) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

/**
 * Clears all persisted authentication tokens.
 */
export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(SESSION_META_KEY);
}

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12_000,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    if (status !== 401 || originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if ((originalRequest as InternalAxiosRequestConfig & { _retry?: boolean })._retry) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    (originalRequest as InternalAxiosRequestConfig & { _retry?: boolean })._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(http(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const token = getRefreshToken();
      if (!token) {
        throw new Error("Refresh token missing");
      }

      const response = await axios.post<ApiEnvelope<AuthPayload>>(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: token,
      });

      persistTokens(response.data.data);
      persistSessionMeta(response.data.data);
      refreshSubscribers.forEach((subscriber) => subscriber(response.data.data.accessToken));
      refreshSubscribers = [];
      originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

/**
 * Logs in the user and returns token and profile payload.
 */
export async function loginApi(email: string, password: string): Promise<AuthPayload> {
  try {
    const response = await http.post<ApiEnvelope<AuthPayload>>("/auth/login", { email, password });
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches dashboard snapshot for the authenticated user.
 */
export async function fetchDashboard(): Promise<DashboardData> {
  try {
    const response = await http.get<ApiEnvelope<DashboardData>>("/dashboard");
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches the ordered topic list with progress.
 */
export async function fetchTopics(): Promise<TopicCard[]> {
  try {
    const response = await http.get<ApiEnvelope<TopicCard[]>>("/topics");
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches full detail content for a topic.
 */
export async function fetchTopicBySlug(slug: string): Promise<TopicDetail> {
  try {
    const response = await http.get<ApiEnvelope<TopicDetail>>(`/topics/${slug}`);
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Updates completion percentage for one topic.
 */
export async function updateTopicProgress(topicId: number, completion: number): Promise<void> {
  try {
    await http.patch(`/topics/${topicId}/progress?completion=${completion}`);
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches quiz questions for a specific topic.
 */
export async function fetchQuizQuestions(topicId: number): Promise<QuizQuestion[]> {
  try {
    const response = await http.get<ApiEnvelope<QuizQuestion[]>>(`/quizzes/${topicId}/questions`);
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Submits a quiz and returns scoring result.
 */
export async function submitQuiz(payload: SubmitQuizRequest): Promise<SubmitQuizResponse> {
  try {
    const response = await http.post<ApiEnvelope<SubmitQuizResponse>>("/quizzes/submit", payload);
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches admin dashboard aggregate metrics.
 */
export async function fetchAdminOverview(): Promise<Record<string, number>> {
  try {
    const response = await http.get<ApiEnvelope<Record<string, number>>>("/admin/overview");
    return response.data.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Converts an unknown thrown value into an Error object.
 */
export function normalizeError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    return new Error(message ?? "Request failed");
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Unexpected error");
}
