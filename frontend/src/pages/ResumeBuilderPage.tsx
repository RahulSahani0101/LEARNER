import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/common/Button";
import { SectionHeader } from "../components/common/SectionHeader";

/**
 * Resume builder page to generate interview-ready experience bullets.
 */
export function ResumeBuilderPage() {
  const [targetRole, setTargetRole] = useState("Java Developer");
  const [targetLocation, setTargetLocation] = useState("Noida");
  const [targetCtc, setTargetCtc] = useState("12 LPA");
  const [skills, setSkills] = useState("Java, Spring Boot, Spring Security, MySQL, JPA, REST APIs, Docker");

  const bullets = useMemo(() => {
    return [
      `Built and maintained a full-stack EdTech platform targeting ${targetRole} interview readiness, with secure JWT authentication, role-based access control, and production-style API contracts.`,
      "Designed and developed 20+ backend learning modules with Spring Boot and JPA, including topic roadmap, progress tracking, quiz engine, and admin analytics.",
      "Implemented resilient frontend API handling with fallback data strategy and retry-safe auth refresh logic, reducing user-facing failures during backend downtime.",
      "Created structured DSA and interview prep modules with model answers, skill-gap analysis, and milestone tracking to improve candidate readiness outcomes.",
      "Prepared cloud deployment artifacts and environment-based configuration for Render, including health checks, CORS controls, and static frontend routing.",
    ];
  }, [targetRole]);

  const summary = useMemo(() => {
    return `Backend-focused engineer preparing for ${targetRole} roles in ${targetLocation} with target compensation ${targetCtc}. Strong in building secure Spring Boot APIs, optimizing SQL workflows, and delivering interview-focused product modules end-to-end.`;
  }, [targetCtc, targetLocation, targetRole]);

  const copyBundle = async () => {
    const text = `Professional Summary\n${summary}\n\nCore Skills\n${skills}\n\nProject Experience\n- ${bullets.join("\n- ")}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Resume content copied to clipboard.");
    } catch {
      toast.error("Clipboard access failed. Copy manually from the screen.");
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Resume Builder" description="Generate high-impact experience bullets aligned to Java backend hiring in Noida." />

      <article className="glass-card grid grid-cols-1 gap-3 rounded-2xl p-4 md:grid-cols-2">
        <label className="text-sm text-brand-muted">
          Target Role
          <input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-brand-text focus:border-brand-cyan/60 focus:outline-none" />
        </label>
        <label className="text-sm text-brand-muted">
          Location
          <input value={targetLocation} onChange={(event) => setTargetLocation(event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-brand-text focus:border-brand-cyan/60 focus:outline-none" />
        </label>
        <label className="text-sm text-brand-muted">
          Target CTC
          <input value={targetCtc} onChange={(event) => setTargetCtc(event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-brand-text focus:border-brand-cyan/60 focus:outline-none" />
        </label>
        <label className="text-sm text-brand-muted">
          Core Skills
          <input value={skills} onChange={(event) => setSkills(event.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-brand-text focus:border-brand-cyan/60 focus:outline-none" />
        </label>
      </article>

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Professional Summary</h3>
        <p className="mt-2 text-sm text-brand-muted">{summary}</p>
      </article>

      <article className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold">Project Experience Bullets</h3>
          <Button onClick={() => void copyBundle()}>Copy Resume Block</Button>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-brand-muted">
          {bullets.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
