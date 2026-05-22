import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchTopicBySlug, fetchTopics, updateTopicProgress } from "../lib/api";

/**
 * Queries all learning topics with user progress.
 */
export function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
    staleTime: 120_000,
  });
}

/**
 * Queries a single topic by slug.
 */
export function useTopicDetail(slug: string) {
  return useQuery({
    queryKey: ["topic", slug],
    enabled: Boolean(slug),
    queryFn: () => fetchTopicBySlug(slug),
    staleTime: 180_000,
  });
}

/**
 * Updates topic progress and surfaces toast feedback.
 */
export function useUpdateTopicProgress() {
  return useMutation({
    mutationFn: (payload: { topicId: number; completion: number }) => updateTopicProgress(payload.topicId, payload.completion),
    onSuccess: () => {
      toast.success("Progress updated");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Progress update failed";
      toast.error(message);
    },
  });
}
