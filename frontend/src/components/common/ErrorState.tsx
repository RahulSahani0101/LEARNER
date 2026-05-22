import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

/**
 * Shared error panel used by data-driven screens.
 */
export function ErrorState({
  title = "We could not load this section",
  description = "Please retry in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="glass-card rounded-2xl p-6 text-center">
      <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-red-400" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
      <p className="mt-1 text-sm text-brand-muted">{description}</p>
      {onRetry ? (
        <Button className="mt-4" onClick={onRetry} aria-label="Retry loading content">
          Retry
        </Button>
      ) : null}
    </div>
  );
}
