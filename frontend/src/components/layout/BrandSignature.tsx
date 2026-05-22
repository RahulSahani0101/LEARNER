import { cn } from "../../lib/cn";

interface BrandSignatureProps {
  className?: string;
}

/**
 * Minimal product signature used across key surfaces.
 */
export function BrandSignature({ className }: BrandSignatureProps) {
  return (
    <p className={cn("text-center text-xs font-medium tracking-wide text-brand-muted", className)}>
      Designed and Developed by - <span className="text-brand-blue">Rahul Sahani</span>
    </p>
  );
}
