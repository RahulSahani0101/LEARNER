interface SectionHeaderProps {
  title: string;
  description?: string;
}

/**
 * Section heading block used across pages.
 */
export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header>
      <h2 className="font-heading text-2xl font-semibold text-brand-text">{title}</h2>
      {description ? <p className="mt-1 text-sm text-brand-muted">{description}</p> : null}
    </header>
  );
}
