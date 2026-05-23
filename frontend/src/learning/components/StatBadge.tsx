import { learningTheme } from "../theme/tokens";

interface StatBadgeProps {
  icon: string;
  label: string;
}

export function StatBadge({ icon, label }: StatBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs" style={{ color: learningTheme.colors.textSecondary }}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
