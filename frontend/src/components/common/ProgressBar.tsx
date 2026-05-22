import { cn } from "../../lib/cn";

interface ProgressBarProps {
  value: number;
  className?: string;
  label?: string;
}

/**
 * Animated progress bar with accessible value labels.
 */
export function ProgressBar({ value, className, label }: ProgressBarProps) {
  const normalized = Math.max(0, Math.min(value, 100));

  return (
    <div className={cn("w-full", className)}>
      {label ? <p className="mb-1 text-xs text-brand-muted">{label}</p> : null}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={normalized} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan transition-all duration-500"
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}
