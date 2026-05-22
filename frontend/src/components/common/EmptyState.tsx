import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

/**
 * Shared empty state used when API responses have no records.
 */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <Inbox className="mx-auto h-6 w-6 text-brand-muted" aria-hidden="true" />
      <h3 className="mt-2 text-lg font-semibold text-brand-text">{title}</h3>
      <p className="mt-1 text-sm text-brand-muted">{description}</p>
    </div>
  );
}
