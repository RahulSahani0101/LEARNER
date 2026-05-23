import { motion } from "framer-motion";
import type { StudyItem } from "../data/courses";
import { learningTheme } from "../theme/tokens";

interface StudyingCardProps {
  item: StudyItem;
}

export function StudyingCard({ item }: StudyingCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="w-[186px] shrink-0 overflow-hidden rounded-2xl border"
      style={{ borderColor: "#ECEFF4", background: "#FFFFFF", boxShadow: learningTheme.shadow.card }}
    >
      <img src={item.thumbnail} alt={item.title} className="h-28 w-full object-cover" loading="lazy" />
      <div className="space-y-1 p-3">
        <h4 className="line-clamp-2 text-[13px] font-semibold leading-4" style={{ color: learningTheme.colors.textPrimary }}>{item.title}</h4>
        <p className="text-[11px]" style={{ color: learningTheme.colors.textMuted }}>{item.lessons} Lesson</p>
        <div className="flex items-center justify-between text-[11px]" style={{ color: learningTheme.colors.textSecondary }}>
          <span>{item.duration}</span>
          <span
            className="rounded-full px-2 py-0.5 font-semibold"
            style={{ background: "#FFE4D1", color: learningTheme.colors.primaryDark }}
          >
            {item.progress}%
          </span>
        </div>
      </div>
    </motion.article>
  );
}
