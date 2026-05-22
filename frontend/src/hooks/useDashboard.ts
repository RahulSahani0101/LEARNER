import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../lib/api";

/**
 * Queries dashboard KPIs and recommendations.
 */
export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 120_000,
  });
}
