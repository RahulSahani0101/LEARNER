import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../lib/api";

/**
 * Queries dashboard KPIs and recommendations.
 */
export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        return await fetchDashboard();
      } catch (error) {
        throw error;
      }
    },
  });
}
