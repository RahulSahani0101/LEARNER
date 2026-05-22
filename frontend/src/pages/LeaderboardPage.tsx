import { useMemo, useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";

/**
 * Leaderboard page to visualize competitive learning momentum.
 */
export function LeaderboardPage() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const entries = useMemo(() => {
    return view === "weekly"
      ? [
          { rank: 1, name: "Aditi", xp: 580, solved: 22 },
          { rank: 2, name: "Rahul", xp: 540, solved: 19 },
          { rank: 3, name: "Naveen", xp: 510, solved: 18 },
          { rank: 4, name: "Simran", xp: 465, solved: 16 },
        ]
      : [
          { rank: 1, name: "Aditi", xp: 2180, solved: 74 },
          { rank: 2, name: "Rahul", xp: 1950, solved: 68 },
          { rank: 3, name: "Naveen", xp: 1840, solved: 61 },
          { rank: 4, name: "Simran", xp: 1735, solved: 58 },
        ];
  }, [view]);

  return (
    <div className="space-y-4">
      <SectionHeader title="Leaderboard" description="Healthy competition fuels consistency and deliberate practice." />
      <div className="flex gap-2">
        <button onClick={() => setView("weekly")} className={`rounded-lg px-3 py-1.5 text-sm ${view === "weekly" ? "bg-brand-cyan/20 text-brand-text" : "bg-white/5 text-brand-muted hover:bg-white/10"}`}>
          Weekly
        </button>
        <button onClick={() => setView("monthly")} className={`rounded-lg px-3 py-1.5 text-sm ${view === "monthly" ? "bg-brand-cyan/20 text-brand-text" : "bg-white/5 text-brand-muted hover:bg-white/10"}`}>
          Monthly
        </button>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <article key={entry.rank} className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="font-medium text-brand-text">#{entry.rank} {entry.name}</p>
              <p className="mt-1 text-xs text-brand-muted">Problems solved: {entry.solved}</p>
            </div>
            <p className="font-heading text-lg font-semibold gradient-text">{entry.xp} XP</p>
          </article>
        ))}
      </div>
    </div>
  );
}
