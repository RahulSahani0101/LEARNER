import { QueryClient } from "@tanstack/react-query";

/**
 * Shared React Query client for caching server state.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 120_000,
      gcTime: 600_000,
    },
    mutations: {
      retry: 0,
    },
  },
});
