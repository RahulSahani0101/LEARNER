import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  label?: string;
}

/**
 * Shared full-width loading feedback for asynchronous sections.
 */
export function LoadingState({ label = "Loading your workspace" }: LoadingStateProps) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-cyan" aria-hidden="true" />
      <p className="mt-2 text-sm text-brand-muted">{label}</p>
    </div>
  );
}
