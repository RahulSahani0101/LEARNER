import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard } from "../../components/common/GlassCard";
import { ProgressBar } from "../../components/common/ProgressBar";
import type { DashboardData, TopicCard } from "../../types";

interface DashboardWidgetsProps {
  dashboard: DashboardData;
}

/**
 * Dashboard KPI grid, consistency chart, and recommended topics.
 */
export const DashboardWidgets = memo(function DashboardWidgets({ dashboard }: DashboardWidgetsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total XP" value={dashboard.xp.toString()} subtitle={`Level ${dashboard.level}`} />
        <MetricCard title="Daily Streak" value={`${dashboard.streakDays} days`} subtitle="Keep momentum daily" />
        <MetricCard title="Completed Topics" value={dashboard.completedTopics.toString()} subtitle="Strong execution signal" />
        <MetricCard title="Started Topics" value={dashboard.startedTopics.toString()} subtitle="In active pipeline" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
        <GlassCard className="h-[280px]">
          <h3 className="font-heading text-lg font-semibold">Weekly Consistency</h3>
          <p className="mb-4 text-sm text-brand-muted">Focused minutes from lessons and quizzes</p>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={dashboard.weeklyConsistency}>
              <XAxis dataKey="day" stroke="#9EA9B8" />
              <YAxis stroke="#9EA9B8" />
              <Tooltip
                cursor={{ fill: "rgba(255,214,111,0.1)" }}
                contentStyle={{
                  background: "rgba(18, 23, 34, 0.94)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="minutes" fill="url(#barGradient)" radius={[10, 10, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E9BE44" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#52D1FF" stopOpacity={0.65} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading text-lg font-semibold">Recommended Tracks</h3>
          <p className="mb-3 text-sm text-brand-muted">Prioritized by your current readiness gap</p>
          <div className="space-y-3">
            {dashboard.recommendedTopics.slice(0, 4).map((topic) => (
              <TopicProgressItem key={topic.id} topic={topic} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
});

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
}

/**
 * Compact metric tile with motion-based entrance.
 */
function MetricCard({ title, value, subtitle }: MetricCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <GlassCard>
        <p className="text-xs uppercase tracking-wide text-brand-muted">{title}</p>
        <p className="mt-2 font-heading text-2xl font-semibold text-brand-text">{value}</p>
        <p className="mt-1 text-xs text-brand-muted">{subtitle}</p>
      </GlassCard>
    </motion.div>
  );
}

interface TopicProgressItemProps {
  topic: TopicCard;
}

/**
 * Recommended topic row showing category and completion status.
 */
function TopicProgressItem({ topic }: TopicProgressItemProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium text-brand-text">{topic.title}</h4>
        <span className="text-xs text-brand-muted">{topic.estimatedMinutes} min</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-wide text-brand-muted">{topic.category.replaceAll("_", " ")}</p>
      <ProgressBar value={topic.completionPercent} className="mt-2" />
      <div className="mt-3 flex gap-3 text-xs">
        <Link className="text-brand-cyan hover:underline" to={`/topics/${topic.slug}`}>
          Open Topic
        </Link>
        <Link className="text-brand-blue hover:underline" to={`/quiz?topicId=${topic.id}`}>
          Start Quiz
        </Link>
      </div>
    </article>
  );
}
