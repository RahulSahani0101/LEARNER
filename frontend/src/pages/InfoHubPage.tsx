import { SectionHeader } from "../components/common/SectionHeader";

interface InfoHubPageProps {
  title: string;
  description: string;
}

/**
 * Generic content page for AI mentor and community hubs.
 */
export function InfoHubPage({ title, description }: InfoHubPageProps) {
  return (
    <div className="space-y-4">
      <SectionHeader title={title} description={description} />
      <article className="glass-card rounded-2xl p-5">
        <p className="text-sm text-brand-muted">
          This module is intentionally structured for iterative expansion. Add API-backed feeds, collaborative sessions, and personalized recommendations as your next milestone.
        </p>
      </article>
    </div>
  );
}
