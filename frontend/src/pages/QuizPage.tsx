import confetti from "canvas-confetti";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../components/common/LoadingState";
import { SectionHeader } from "../components/common/SectionHeader";
import { useQuizQuestions, useSubmitQuiz } from "../hooks/useQuiz";

/**
 * Quiz player with scoring and confetti celebration.
 */
export function QuizPage() {
  const [params] = useSearchParams();
  const topicId = Number(params.get("topicId") ?? "1");
  const quiz = useQuizQuestions(topicId);
  const submitQuiz = useSubmitQuiz();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const canSubmit = useMemo(() => {
    return quiz.data ? Object.keys(answers).length === quiz.data.length : false;
  }, [answers, quiz.data]);

  if (quiz.isLoading) {
    return <LoadingState label="Loading quiz set" />;
  }

  if (quiz.isError) {
    return <ErrorState title="Quiz unavailable" description={quiz.error.message} onRetry={() => void quiz.refetch()} />;
  }

  if (!quiz.data || quiz.data.length === 0) {
    return <EmptyState title="No questions" description="This topic currently has no quiz records." />;
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Topic Quiz" description="Attempt once for confidence, retry for precision and speed." />

      <div className="space-y-3">
        {quiz.data.map((question, index) => {
          const options = [question.optionA, question.optionB, question.optionC, question.optionD];
          return (
            <article key={question.id} className="glass-card rounded-2xl p-4">
              <p className="text-sm text-brand-muted">Q{index + 1}</p>
              <h3 className="mt-1 font-medium text-brand-text">{question.prompt}</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {options.map((option, optionIndex) => {
                  const selected = answers[question.id] === optionIndex + 1;
                  return (
                    <button
                      key={`${question.id}-${option}`}
                      className={`rounded-xl border px-3 py-2 text-left text-sm transition ${selected ? "border-brand-cyan bg-brand-cyan/10 text-brand-text" : "border-white/10 bg-white/5 text-brand-muted hover:border-brand-blue/70"}`}
                      onClick={() => setAnswers((state) => ({ ...state, [question.id]: optionIndex + 1 }))}
                      aria-label={`Select option ${optionIndex + 1}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <Button
        disabled={!canSubmit || submitQuiz.isPending}
        onClick={() => {
          submitQuiz.mutate(
            {
              topicId,
              answers: Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({
                questionId: Number(questionId),
                selectedOptionIndex,
              })),
            },
            {
              onSuccess: (result) => {
                if (result.passed) {
                  void confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
                }
              },
            },
          );
        }}
        aria-label="Submit quiz"
      >
        {submitQuiz.isPending ? "Submitting..." : "Submit Quiz"}
      </Button>

      {submitQuiz.data ? (
        <article className="glass-card rounded-2xl p-4">
          <h3 className="font-heading text-lg font-semibold">Result Summary</h3>
          <p className="mt-1 text-sm text-brand-muted">
            Score: {submitQuiz.data.score}% | XP Awarded: {submitQuiz.data.xpAwarded} | Status: {submitQuiz.data.passed ? "Passed" : "Needs Retry"}
          </p>
          <div className="mt-3 space-y-2">
            {quiz.data.map((question, index) => (
              <div key={question.id} className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-brand-muted">
                <p className="text-brand-text">Q{index + 1}: {question.prompt}</p>
                <p className="mt-1">Your selection: Option {answers[question.id] ?? "Not answered"}</p>
                <p className="mt-1">Explanation: Re-check problem constraints, then evaluate tradeoffs for correctness first and complexity second.</p>
              </div>
            ))}
          </div>
        </article>
      ) : null}
    </div>
  );
}
