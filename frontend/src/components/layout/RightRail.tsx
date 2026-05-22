import { AlarmClock, Bot, Crown, NotebookPen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../common/GlassCard";

/**
 * Right insight rail showing assistant focus, schedule, and client-style cards.
 */
export function RightRail() {
  const navigate = useNavigate();

  return (
    <aside className="space-y-4" aria-label="AI assistant and reminders">
      <GlassCard className="relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-blue/25 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
          <h3 className="font-heading text-sm font-semibold">AI Mentor Pulse</h3>
        </div>
        <p className="mt-2 text-sm text-brand-muted">Focus now: Spring Security JWT lifecycle, refresh pitfalls, and production token rotation checklist.</p>
        <button
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-[#1A1407] transition hover:brightness-105"
          aria-label="Open AI mentor"
          onClick={() => navigate("/ai-mentor")}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Follow-up
        </button>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <AlarmClock className="h-4 w-4 text-brand-blue" />
          <h3 className="font-heading text-sm font-semibold">Today's Schedule</h3>
        </div>
        <ul className="mt-2 space-y-2 text-sm text-brand-muted">
          <li>7:00 PM IST - SQL Query Optimization Drills</li>
          <li>8:30 PM IST - Mock Interview: Java + DSA</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-brand-blue" />
          <h3 className="font-heading text-sm font-semibold">Top Performers</h3>
        </div>
        <ol className="mt-2 space-y-2 text-sm text-brand-muted">
          <li>#1 Aditi - 1780 XP</li>
          <li>#2 Rahul - 1250 XP</li>
          <li>#3 Naveen - 1210 XP</li>
        </ol>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <NotebookPen className="h-4 w-4 text-brand-cyan" />
          <h3 className="font-heading text-sm font-semibold">Quick Note</h3>
        </div>
        <p className="mt-2 text-sm text-brand-muted">HashMap average O(1) depends on hash distribution, table resize thresholds, and collision strategy.</p>
      </GlassCard>
    </aside>
  );
}
