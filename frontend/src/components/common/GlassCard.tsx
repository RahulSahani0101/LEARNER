import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface GlassCardProps {
  className?: string;
  interactive?: boolean;
}

/**
 * Glassmorphism container with consistent hover depth.
 */
export function GlassCard({ children, className, interactive = true }: PropsWithChildren<GlassCardProps>) {
  return (
    <motion.section
      initial={{ opacity: 0.01, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -2 } : undefined}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card rounded-2xl p-4 sm:p-5", interactive ? "neon-hover" : "", className)}
    >
      {children}
    </motion.section>
  );
}
