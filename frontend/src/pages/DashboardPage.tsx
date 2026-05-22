import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { GlassCard } from "../components/common/GlassCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { DashboardWidgets } from "../features/dashboard/DashboardWidgets";
import { fallbackDashboard } from "../data/jobPrepData";
import { useAuthStore } from "../store/authStore";
import { useDashboard } from "../hooks/useDashboard";
import { LoadingState } from "../components/common/LoadingState";

/**
 * Main learner dashboard with premium hero and KPI widgets.
 */
export function DashboardPage() {
  const navigate = useNavigate();
  const dashboard = useDashboard();
  const dashboardData = dashboard.data ?? fallbackDashboard;
  const fullName = useAuthStore((state) => state.fullName) || "Rahul Sahani";

  if (dashboard.isLoading && !dashboard.data) {
    return <LoadingState label="Preparing your dashboard" />;
  }

  return (
    <div className="space-y-5">
      {dashboard.isError ? (
        <article className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Live data is temporarily unavailable. Showing cached learning insights so progress never stops.
        </article>
      ) : null}

      <GlassCard className="relative overflow-hidden" interactive={false}>
        <div className="absolute inset-0 bg-hero-mesh opacity-80" aria-hidden="true" />
        <div className="absolute -right-20 top-0 h-48 w-48 rounded-full bg-brand-blue/30 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeader title={`Welcome back, ${fullName.split(" ")[0]}.`} description="Your premium Java engineering dashboard is tuned for interview velocity and production confidence." />
            <p className="mt-3 max-w-2xl text-sm text-brand-muted">
              Recommended today: complete one Spring Boot architecture topic, submit one quiz, and finish a medium DSA pattern to maintain momentum.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button aria-label="Start roadmap" onClick={() => navigate("/courses")}>Continue Learning</Button>
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
