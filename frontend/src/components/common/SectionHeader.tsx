interface SectionHeaderProps {
  title: string;
  description?: string;
}

/**
 * Section heading block used across pages.
 */
export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="space-y-1">
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-text md:text-[1.85rem]">{title}</h2>
      {description ? <p className="max-w-3xl text-sm text-brand-muted md:text-[0.92rem]">{description}</p> : null}
    </header>
  );
}
