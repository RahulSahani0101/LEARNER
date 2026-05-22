import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

interface GlassCardProps {
  className?: string;
}

/**
 * Glassmorphism container with consistent hover depth.
 */
export function GlassCard({ children, className }: PropsWithChildren<GlassCardProps>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("glass-card neon-hover rounded-2xl p-4 sm:p-5", className)}
    >
      {children}
    </motion.section>
  );
}
