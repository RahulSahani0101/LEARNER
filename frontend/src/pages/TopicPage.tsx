import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { SectionHeader } from "../components/common/SectionHeader";
import { useTopicDetail, useUpdateTopicProgress } from "../hooks/useTopics";

/**
 * Topic detail page with interview points and actionable practice.
 */
export function TopicPage() {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const topic = useTopicDetail(slug);
  const progress = useUpdateTopicProgress();

  if (topic.isLoading) {
    return <LoadingState label="Loading topic details" />;
  }

  if (topic.isError) {
    return <ErrorState title="Topic unavailable" description={topic.error.message} onRetry={() => void topic.refetch()} />;
  }

  if (!topic.data) {
    return <EmptyState title="No topic details" description="Topic details are not available for this slug." />;
  }

  return (
    <div className="space-y-4">
      <SectionHeader title={topic.data.title} description={topic.data.summary} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="glass-card rounded-2xl p-4 lg:col-span-2">
          <h3 className="font-heading text-lg font-semibold">Interview Talking Points</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {topic.data.interviewPoints.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>

          <h3 className="mt-5 font-heading text-lg font-semibold">Practice Problems</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {topic.data.practiceProblems.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </article>

        <article className="glass-card rounded-2xl p-4">
          <h3 className="font-heading text-lg font-semibold">Common Mistakes</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {topic.data.commonMistakes.map((mistake) => (
              <li key={mistake}>- {mistake}</li>
            ))}
          </ul>

          <Button
            className="mt-5 w-full"
            disabled={progress.isPending}
            onClick={() => progress.mutate({ topicId: topic.data.id, completion: 100 })}
            aria-label="Mark topic complete"
          >
            {progress.isPending ? "Updating..." : "Mark Complete (+100 XP)"}
          </Button>

          <Button className="mt-2 w-full" variant="secondary" onClick={() => navigate(`/quiz?topicId=${topic.data.id}`)} aria-label="Take topic quiz">
            Take Topic Quiz
          </Button>
        </article>
      </div>
    </div>
  );
}
