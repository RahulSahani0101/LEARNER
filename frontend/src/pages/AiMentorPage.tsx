import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { SectionHeader } from "../components/common/SectionHeader";
import { aiMentorPlaybooks } from "../data/jobPrepData";

interface ChatMessage {
  id: string;
  role: "user" | "mentor";
  text: string;
}

function mentorReply(question: string): { summary: string; steps: string[] } {
  const normalized = question.toLowerCase();
  const matchedPlaybook = aiMentorPlaybooks.find((playbook) => playbook.trigger.some((keyword) => normalized.includes(keyword)));

  if (matchedPlaybook) {
    return {
      summary: matchedPlaybook.response,
      steps: matchedPlaybook.nextSteps,
    };
  }

  return {
    summary: "Focus on one measurable backend goal this week and build proof with code, tests, and a deploy note.",
    steps: [
      "Define one API or feature outcome you can finish in 2 days.",
      "Write test cases first for happy path and error path.",
      "Push changes with commit messages that explain business impact.",
    ],
  };
}

/**
 * AI mentor page with actionable recommendations and skill-gap support.
 */
export function AiMentorPage() {
  const [params] = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "mentor",
      text: "Share your bug, interview doubt, or weak skill area. I will return a concrete action plan.",
    },
  ]);

  const skillGap = useMemo(
    () => [
      { skill: "Spring Security JWT", status: "Medium", action: "Implement refresh rotation and add integration tests." },
      { skill: "JPA Performance", status: "Medium", action: "Practice N+1 debugging and fetch-join optimizations." },
      { skill: "SQL Optimization", status: "High", action: "Solve 10 EXPLAIN-based tuning tasks this month." },
      { skill: "DSA Medium Speed", status: "High", action: "Timed 90-minute sets, then reattempt after 48h." },
      { skill: "Behavioral Storytelling", status: "Medium", action: "Prepare 5 STAR stories from real project fixes." },
    ],
    [],
  );

  useEffect(() => {
    const q = params.get("q");
    if (q) {
      setPrompt(q);
    }
  }, [params]);

  const sendPrompt = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    const reply = mentorReply(trimmedValue);
    setMessages((state) => [
      ...state,
      { id: `user-${state.length}`, role: "user", text: trimmedValue },
      {
        id: `mentor-${state.length}`,
        role: "mentor",
        text: `${reply.summary}\n\nAction plan:\n- ${reply.steps.join("\n- ")}`,
      },
    ]);
    setPrompt("");
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="AI Mentor" description="Bug-fix guidance, learning nudges, and skill-gap analysis for Java backend interviews." />

      <article className="glass-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          {[
            "My dashboard API shows request failed. How do I debug it?",
            "I keep getting 401 in Spring Boot JWT flow.",
            "Give me a 2-week plan for DSA + Spring Boot interview prep.",
          ].map((sample) => (
            <button key={sample} onClick={() => sendPrompt(sample)} className="rounded-full bg-white/10 px-3 py-1 text-xs text-brand-muted hover:bg-white/20 hover:text-brand-text">
              {sample}
            </button>
          ))}
        </div>

        <div className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <article key={message.id} className={`rounded-xl border p-3 text-sm whitespace-pre-line ${message.role === "mentor" ? "border-brand-cyan/30 bg-brand-cyan/10 text-brand-text" : "border-white/10 bg-white/5 text-brand-muted"}`}>
              <p className="mb-1 text-xs uppercase tracking-wide">{message.role === "mentor" ? "AI Mentor" : "You"}</p>
              {message.text}
            </article>
          ))}
        </div>

        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            sendPrompt(prompt);
          }}
        >
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask about Spring Boot, SQL, DSA, debugging, resume bullets..."
            aria-label="Ask AI mentor"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-cyan/60 focus:outline-none"
          />
          <Button type="submit">Get Guidance</Button>
        </form>
      </article>

      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Skill Gap Matrix (Target: Java Developer, Noida, 12 LPA)</h3>
        <div className="mt-3 space-y-2">
          {skillGap.map((item) => (
            <div key={item.skill} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-sm font-medium text-brand-text">{item.skill}</p>
              <p className="mt-1 text-xs text-brand-muted">Current priority: {item.status}</p>
              <p className="mt-1 text-xs text-brand-muted">Next action: {item.action}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
