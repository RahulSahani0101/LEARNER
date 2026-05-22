import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchTopicBySlug, fetchTopics, updateTopicProgress } from "../lib/api";

/**
 * Queries all learning topics with user progress.
 */
export function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      try {
        return await fetchTopics();
      } catch (error) {
        throw error;
      }
    },
  });
}

/**
 * Queries a single topic by slug.
 */
export function useTopicDetail(slug: string) {
  return useQuery({
    queryKey: ["topic", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      try {
        return await fetchTopicBySlug(slug);
      } catch (error) {
        throw error;
      }
    },
  });
}

/**
 * Updates topic progress and surfaces toast feedback.
 */
export function useUpdateTopicProgress() {
  return useMutation({
    mutationFn: async (payload: { topicId: number; completion: number }) => {
      try {
        await updateTopicProgress(payload.topicId, payload.completion);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Progress updated");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Progress update failed";
      toast.error(message);
    },
  });
}
