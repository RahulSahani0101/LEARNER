import { useMemo, useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import { interviewSections } from "../data/jobPrepData";

/**
 * Interview prep planning page for Java backend and HR rounds.
 */
export function InterviewPrepPage() {
  const [activeSectionId, setActiveSectionId] = useState(interviewSections[0].id);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(interviewSections[0].questions[0].id);

  const activeSection = useMemo(() => {
    return interviewSections.find((item) => item.id === activeSectionId) ?? interviewSections[0];
  }, [activeSectionId]);

  return (
    <div className="space-y-4">
      <SectionHeader title="Interview Prep" description="Java, Spring Boot, SQL, DSA, and behavioral readiness in one board." />

      <article className="glass-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          {interviewSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                setExpandedQuestionId(section.questions[0]?.id ?? null);
              }}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${activeSectionId === section.id ? "bg-brand-cyan/20 text-brand-text" : "bg-white/5 text-brand-muted hover:bg-white/10 hover:text-brand-text"}`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-brand-muted">{activeSection.description}</p>

        <div className="mt-4 space-y-3">
          {activeSection.questions.map((item) => {
            const expanded = expandedQuestionId === item.id;
            return (
              <article key={item.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <button onClick={() => setExpandedQuestionId(expanded ? null : item.id)} className="w-full text-left">
                  <h3 className="font-medium text-brand-text">{item.question}</h3>
                </button>
                {expanded ? (
                  <div className="mt-3 space-y-2 text-sm text-brand-muted">
                    <p><span className="text-brand-text">Model answer:</span> {item.answer}</p>
                    <p><span className="text-brand-text">Interviewer checks:</span> {item.whatInterviewersCheck}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </article>

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">7-Day Mock Interview Sprint</h3>
        <ol className="mt-3 space-y-2 text-sm text-brand-muted">
          <li>1. Day 1: Java core + collections interview recap (45 min).</li>
          <li>2. Day 2: Spring Boot REST + Security deep dive (60 min).</li>
          <li>3. Day 3: SQL joins/indexes + EXPLAIN based optimization (45 min).</li>
          <li>4. Day 4: DSA medium set timed at 90 minutes.</li>
          <li>5. Day 5: Build and explain one mini backend feature with tests.</li>
          <li>6. Day 6: Behavioral story rehearsal with STAR format.</li>
          <li>7. Day 7: Full mock interview simulation and improvement notes.</li>
        </ol>
      </article>
    </div>
  );
}
