import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchQuizQuestions, submitQuiz } from "../lib/api";
import type { SubmitQuizRequest } from "../types";

/**
 * Queries quiz question bank for one topic.
 */
export function useQuizQuestions(topicId: number) {
  return useQuery({
    queryKey: ["quiz", topicId],
    enabled: topicId > 0,
    queryFn: async () => {
      try {
        return await fetchQuizQuestions(topicId);
      } catch (error) {
        throw error;
      }
    },
  });
}

/**
 * Submits quiz answers and shows result feedback.
 */
export function useSubmitQuiz() {
  return useMutation({
    mutationFn: async (payload: SubmitQuizRequest) => {
      try {
        return await submitQuiz(payload);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (result) => {
      toast.success(result.passed ? "Quiz passed. XP awarded." : "Submitted. Review and retry for higher XP.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Could not submit quiz";
      toast.error(message);
    },
  });
}
