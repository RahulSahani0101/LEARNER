import { useNavigate } from "react-router-dom";
import { DashboardWidgets } from "../features/dashboard/DashboardWidgets";
import { useDashboard } from "../hooks/useDashboard";
import { LoadingState } from "../components/common/LoadingState";
import { SectionHeader } from "../components/common/SectionHeader";
import { Button } from "../components/common/Button";
import { GlassCard } from "../components/common/GlassCard";
import { fallbackDashboard } from "../data/jobPrepData";

/**
 * Main learner dashboard with hero and KPI widgets.
 */
export function DashboardPage() {
  const navigate = useNavigate();
  const dashboard = useDashboard();
  const dashboardData = dashboard.data ?? fallbackDashboard;

  if (dashboard.isLoading && !dashboard.data) {
    return <LoadingState label="Building your personalized dashboard" />;
  }

  return (
    <div className="space-y-4">
      {dashboard.isError ? (
        <article className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Live dashboard API is temporarily unavailable, so fallback prep data is shown. You can still continue learning.
        </article>
      ) : null}

      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-70" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionHeader title="Code Today, Build Tomorrow." description="AI-powered Java interview prep tuned for backend hiring patterns." />
            <p className="mt-2 max-w-2xl text-sm text-brand-muted">
              Continue your streak by finishing one Spring Boot topic and one DSA quiz today. This matches recruiter screening expectations for 1-2 year profiles.
            </p>
          </div>
          <div className="flex gap-2">
            <Button aria-label="Start roadmap" onClick={() => navigate("/courses")}>Start Roadmap</Button>
            <Button variant="secondary" aria-label="Open AI mentor" onClick={() => navigate("/ai-mentor")}>
              Ask AI Mentor
            </Button>
          </div>
        </div>
      </GlassCard>
      <DashboardWidgets dashboard={dashboardData} />
    </div>
  );
}
