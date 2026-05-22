import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

/**
 * Reusable CTA button with accessible focus and neon variants.
 */
export function Button({ children, className, variant = "primary", ...props }: PropsWithChildren<ButtonProps>) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50";
  const styleByVariant: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-neonPurple hover:shadow-neonBlue",
    secondary: "glass-card text-brand-text hover:border-brand-cyan/60",
    ghost: "text-brand-muted hover:text-brand-text hover:bg-white/5",
  };

  return (
    <button className={cn(base, styleByVariant[variant], className)} {...props}>
      {children}
    </button>
  );
}
