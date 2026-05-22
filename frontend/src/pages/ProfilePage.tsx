import { SectionHeader } from "../components/common/SectionHeader";

/**
 * Profile page showing learner identity and growth targets.
 */
export function ProfilePage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Profile" description="Showcase your progress and interview readiness metrics." />
      <article className="glass-card rounded-2xl p-5">
        <h3 className="font-heading text-lg font-semibold">Rahul Sharma</h3>
        <p className="mt-1 text-sm text-brand-muted">Java Backend Learner | Target 8-10 LPA | Noida/NCR</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-brand-muted">XP</p>
            <p className="mt-1 text-xl font-semibold">1250</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-brand-muted">Level</p>
            <p className="mt-1 text-xl font-semibold">4</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-brand-muted">Streak</p>
            <p className="mt-1 text-xl font-semibold">5 Days</p>
          </div>
        </div>
      </article>
    </div>
  );
}
