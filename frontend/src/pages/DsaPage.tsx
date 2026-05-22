import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { SectionHeader } from "../components/common/SectionHeader";
import { dsaTracks } from "../data/jobPrepData";

/**
 * DSA tracker page with structured preparation targets.
 */
export function DsaPage() {
  const navigate = useNavigate();
  const [activeTrackId, setActiveTrackId] = useState(dsaTracks[0].id);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(dsaTracks[0].questions[0].id);
  const [solvedSet, setSolvedSet] = useState<Record<string, boolean>>({});

  const activeTrack = useMemo(() => {
    return dsaTracks.find((track) => track.id === activeTrackId) ?? dsaTracks[0];
  }, [activeTrackId]);

  const solvedCount = useMemo(() => {
    return activeTrack.questions.filter((question) => solvedSet[question.id]).length;
  }, [activeTrack.questions, solvedSet]);

  return (
    <div className="space-y-4">
      <SectionHeader title="DSA Tracker" description="Pattern-first preparation with real interview-style problem breakdowns and Java hints." />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[290px_minmax(0,1fr)]">
        <article className="glass-card rounded-2xl p-4">
          <h3 className="font-heading text-base font-semibold">Tracks</h3>
          <p className="mt-1 text-xs text-brand-muted">Switch track, solve questions, and mark what you have practiced.</p>
          <div className="mt-3 space-y-2">
            {dsaTracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  setActiveTrackId(track.id);
                  setExpandedQuestionId(track.questions[0]?.id ?? null);
                }}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${activeTrackId === track.id ? "border-brand-cyan/70 bg-brand-cyan/10" : "border-white/10 bg-white/5 hover:border-brand-blue/60"}`}
              >
                <p className="text-sm font-medium text-brand-text">{track.title}</p>
                <p className="mt-1 text-xs text-brand-muted">{track.target}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="glass-card rounded-2xl p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-xl font-semibold">{activeTrack.title}</h3>
              <p className="mt-1 text-sm text-brand-muted">{activeTrack.weeklyGoal}</p>
              <p className="mt-2 text-xs text-brand-muted">Solved in this track: {solvedCount}/{activeTrack.questions.length}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate("/code-editor")}>Open Java Code Lab</Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {activeTrack.patterns.map((pattern) => (
              <span key={pattern} className="rounded-full bg-white/10 px-3 py-1 text-xs text-brand-muted">
                {pattern}
              </span>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {activeTrack.questions.map((question) => {
              const expanded = expandedQuestionId === question.id;
              const solved = Boolean(solvedSet[question.id]);
              return (
                <article key={question.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <button
                    onClick={() => setExpandedQuestionId(expanded ? null : question.id)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-brand-text">{question.title}</p>
                      <p className="mt-1 text-xs text-brand-muted">{question.difficulty} • {question.complexity}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${solved ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-brand-muted"}`}>
                      {solved ? "Practiced" : "Pending"}
                    </span>
                  </button>

                  {expanded ? (
                    <div className="mt-3 space-y-2 text-sm text-brand-muted">
                      <p><span className="text-brand-text">Problem:</span> {question.prompt}</p>
                      <p><span className="text-brand-text">Approach:</span> {question.approach}</p>
                      <p><span className="text-brand-text">Java Hint:</span> {question.javaHint}</p>
                      <button
                        onClick={() => setSolvedSet((state) => ({ ...state, [question.id]: !state[question.id] }))}
                        className="mt-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-brand-text hover:bg-white/10"
                      >
                        {solved ? "Mark Pending" : "Mark Practiced"}
                      </button>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}
