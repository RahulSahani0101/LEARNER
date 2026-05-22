import { useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import { communityItems } from "../data/jobPrepData";

/**
 * Community page with collaborative study options and accountability loops.
 */
export function CommunityPage() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      <SectionHeader title="Community" description="Peer accountability, live pair sessions, and structured review circles." />

      <section className="space-y-3">
        {communityItems.map((item) => {
          const isJoined = Boolean(joined[item.id]);
          return (
            <article key={item.id} className="glass-card rounded-2xl p-4">
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-brand-muted">{item.schedule}</p>
              <p className="mt-1 text-sm text-brand-muted">{item.format}</p>
              <button
                onClick={() => setJoined((state) => ({ ...state, [item.id]: !state[item.id] }))}
                className={`mt-3 rounded-lg px-3 py-2 text-sm ${isJoined ? "bg-emerald-500/20 text-emerald-300" : "bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30"}`}
              >
                {isJoined ? "Joined" : "Join Session"}
              </button>
            </article>
          );
        })}
      </section>

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Weekly Accountability Template</h3>
        <ul className="mt-3 space-y-2 text-sm text-brand-muted">
          <li>1. Share one API endpoint implemented this week.</li>
          <li>2. Share one bug and how you traced root cause.</li>
          <li>3. Share one SQL or DSA problem solved with approach notes.</li>
          <li>4. Share one interview question and your refined answer.</li>
        </ul>
      </article>
    </div>
  );
}
