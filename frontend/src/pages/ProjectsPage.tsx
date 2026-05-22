import { useMemo, useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import { projectBlueprints } from "../data/jobPrepData";

/**
 * Project page with production-grade project blueprints for portfolio building.
 */
export function ProjectsPage() {
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  const completion = useMemo(() => {
    const allMilestones = projectBlueprints.flatMap((project) => project.milestones.map((milestone) => `${project.id}-${milestone}`));
    const done = allMilestones.filter((key) => completedMilestones[key]).length;
    return {
      done,
      total: allMilestones.length,
      percent: allMilestones.length ? Math.round((done / allMilestones.length) * 100) : 0,
    };
  }, [completedMilestones]);

  return (
    <div className="space-y-4">
      <SectionHeader title="Projects" description="Portfolio-grade backend projects mapped to real hiring signals." />

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Execution Tracker</h3>
        <p className="mt-1 text-sm text-brand-muted">
          Completed milestones: {completion.done}/{completion.total} ({completion.percent}%)
        </p>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan" style={{ width: `${completion.percent}%` }} />
        </div>
      </article>

      <section className="space-y-3">
        {projectBlueprints.map((project) => (
          <article key={project.id} className="glass-card rounded-2xl p-4">
            <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-brand-muted">{project.outcome}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs text-brand-muted">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {project.milestones.map((milestone) => {
                const key = `${project.id}-${milestone}`;
                const checked = Boolean(completedMilestones[key]);
                return (
                  <label key={milestone} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-brand-muted">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => setCompletedMilestones((state) => ({ ...state, [key]: event.target.checked }))}
                    />
                    <span className={checked ? "text-brand-text line-through" : ""}>{milestone}</span>
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
