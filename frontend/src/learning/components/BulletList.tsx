import { AnimatePresence, motion } from "framer-motion";
import { learningTheme } from "../theme/tokens";

interface BulletListProps {
  items: string[];
  expanded: boolean;
}

export function BulletList({ items, expanded }: BulletListProps) {
  const visibleItems = expanded ? items : items.slice(0, 4);

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={expanded ? "expanded" : "collapsed"}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.6 }}
        className="space-y-2"
      >
        {visibleItems.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-start gap-2 text-sm"
            style={{ color: learningTheme.colors.textSecondary }}
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: learningTheme.colors.primary }} />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
