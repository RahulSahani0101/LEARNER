import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingState } from "../components/common/LoadingState";
import { SectionHeader } from "../components/common/SectionHeader";
import { fetchAdminOverview } from "../lib/api";

/**
 * Admin-only analytics screen.
 */
export function AdminPage() {
  const overview = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      try {
        return await fetchAdminOverview();
      } catch (error) {
        throw error;
      }
    },
  });

  if (overview.isLoading) {
    return <LoadingState label="Loading admin metrics" />;
  }

  if (!overview.data && !overview.isError) {
    return <EmptyState title="No admin metrics" description="No admin aggregate data returned from API." />;
  }

  const stats = overview.data ?? {
    users: 0,
    badges: 0,
    quizzes: 0,
    topics: 0,
  };

  return (
    <div className="space-y-4">
      {overview.isError ? (
        <article className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Admin API is unavailable right now. Showing fallback release checklist so operations can continue.
        </article>
      ) : null}

      <SectionHeader title="Admin Overview" description="Platform telemetry for growth and content quality checks." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(stats).map(([key, value]) => (
          <article key={key} className="glass-card rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-brand-muted">{key}</p>
            <p className="mt-2 font-heading text-2xl font-semibold gradient-text">{value}</p>
          </article>
        ))}
      </div>

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Release Readiness Checklist</h3>
        <ul className="mt-3 space-y-2 text-sm text-brand-muted">
          <li>1. Auth flow tested (login, refresh, role-guarded routes).</li>
          <li>2. Core learner APIs tested (dashboard, topics, quizzes).</li>
          <li>3. Frontend build passes and route rewrites verified.</li>
          <li>4. Render env vars configured (JWT, CORS, API base URL).</li>
          <li>5. `/actuator/health` monitored after deployment.</li>
        </ul>
      </article>
    </div>
  );
}
