import { AlarmClock, Bot, Crown, NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "../common/GlassCard";

/**
 * Right insight rail showing AI helper and upcoming events.
 */
export function RightRail() {
  const navigate = useNavigate();

  return (
    <aside className="space-y-4" aria-label="AI assistant and reminders">
      <GlassCard>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
          <h3 className="font-heading text-sm font-semibold">AI Mentor</h3>
        </div>
        <p className="mt-2 text-sm text-brand-muted">Focus today: Spring Security JWT token lifecycle and refresh token pitfalls.</p>
        <button className="mt-3 rounded-lg bg-brand-cyan/20 px-3 py-1.5 text-xs text-brand-cyan transition hover:bg-brand-cyan/30" aria-label="Open AI mentor" onClick={() => navigate("/ai-mentor")}>
          Ask Follow-up
        </button>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <AlarmClock className="h-4 w-4 text-brand-blue" />
          <h3 className="font-heading text-sm font-semibold">Live Classes</h3>
        </div>
        <ul className="mt-2 space-y-2 text-sm text-brand-muted">
          <li>7:00 PM IST - SQL Query Optimization Drills</li>
          <li>8:30 PM IST - Mock Interview: Java + DSA</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-400" />
          <h3 className="font-heading text-sm font-semibold">Leaderboard</h3>
        </div>
        <ol className="mt-2 space-y-2 text-sm text-brand-muted">
          <li>#1 Aditi - 1780 XP</li>
          <li>#2 Rahul - 1250 XP</li>
          <li>#3 Naveen - 1210 XP</li>
        </ol>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2">
          <NotebookPen className="h-4 w-4 text-brand-purple" />
          <h3 className="font-heading text-sm font-semibold">Quick Notes</h3>
        </div>
        <p className="mt-2 text-sm text-brand-muted">Remember: HashMap average O(1) depends on good hash distribution and resize thresholds.</p>
      </GlassCard>
    </aside>
  );
}
