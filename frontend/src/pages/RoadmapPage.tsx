import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingState } from "../components/common/LoadingState";
import { ProgressBar } from "../components/common/ProgressBar";
import { SectionHeader } from "../components/common/SectionHeader";
import { fallbackTopics } from "../data/jobPrepData";
import { useTopics } from "../hooks/useTopics";

interface RoadmapPageProps {
  mode?: "courses" | "roadmap";
}

/**
 * Topic roadmap page with ordered curriculum progression.
 */
export function RoadmapPage({ mode = "roadmap" }: RoadmapPageProps) {
  const topics = useTopics();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const allTopics = topics.data ?? fallbackTopics;

  const categories = useMemo(() => {
    const values = new Set(allTopics.map((topic) => topic.category));
    return ["ALL", ...Array.from(values)];
  }, [allTopics]);

  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const inCategory = category === "ALL" || topic.category === category;
      const inSearch = topic.title.toLowerCase().includes(search.toLowerCase()) || topic.summary.toLowerCase().includes(search.toLowerCase());
      return inCategory && inSearch;
    });
  }, [allTopics, category, search]);

  if (topics.isLoading && !topics.data) {
    return <LoadingState label="Loading roadmap topics" />;
  }

  if (!filteredTopics.length && !topics.data?.length) {
    return <EmptyState title="No roadmap topics" description="Seed data is missing. Start backend seeding first." />;
  }

  return (
    <div className="space-y-4">
      {topics.isError ? (
        <article className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Live course API is unavailable, so curated fallback content is loaded. Retry API after backend starts.
        </article>
      ) : null}

      <SectionHeader
        title={mode === "courses" ? "Courses" : "Learning Roadmap"}
        description={mode === "courses" ? "Structured Java backend course tracks for job-ready outcomes." : "Critical-to-medium sequence mapped to backend interview demand."}
      />

      <article className="glass-card grid grid-cols-1 gap-3 rounded-2xl p-4 md:grid-cols-[1fr_220px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search topics, examples, and interview modules"
          aria-label="Search courses"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-cyan/60 focus:outline-none"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter category"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-brand-text focus:border-brand-cyan/60 focus:outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </article>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredTopics.map((topic) => (
          <article key={topic.id} className="glass-card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-medium text-brand-text">{topic.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-brand-muted">{topic.category.replaceAll("_", " ")}</p>
              </div>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-brand-muted">{topic.estimatedMinutes} min</span>
            </div>
            <p className="mt-3 text-sm text-brand-muted">{topic.summary}</p>
            <ProgressBar value={topic.completionPercent} className="mt-4" label={`${topic.completionPercent}% complete`} />
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link to={`/topics/${topic.slug}`} className="font-medium text-brand-cyan hover:underline" aria-label={`Open topic ${topic.title}`}>
                Open Topic
              </Link>
              <Link to={`/quiz?topicId=${topic.id}`} className="font-medium text-brand-blue hover:underline" aria-label={`Start quiz for ${topic.title}`}>
                Start Quiz
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
