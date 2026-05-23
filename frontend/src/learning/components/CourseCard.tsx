import { motion } from "framer-motion";
import type { CourseItem } from "../data/courses";
import { RatingRow } from "./RatingRow";
import { learningTheme } from "../theme/tokens";

interface CourseCardProps {
  course: CourseItem;
  onOpen: (course: CourseItem) => void;
}

const toneByTheme = {
  teal: "linear-gradient(145deg,#9AE6E0,#5BC7BA)",
  purple: "linear-gradient(145deg,#B2B1FF,#D6A8FF)",
  orange: "linear-gradient(145deg,#FFD59D,#FF9F70)",
};

export function CourseCard({ course, onOpen }: CourseCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(course)}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -4 }}
      className="w-[164px] shrink-0 overflow-hidden rounded-2xl border text-left"
      style={{ borderColor: "#ECEFF4", background: learningTheme.colors.surface, boxShadow: learningTheme.shadow.card }}
    >
      <motion.div
        layoutId={`course-thumb-${course.id}`}
        className="h-24 p-2"
        style={{ background: toneByTheme[course.theme] }}
      >
        <img src={course.thumbnail} alt={course.title} className="h-full w-full rounded-xl object-cover" loading="lazy" />
      </motion.div>
      <div className="p-3">
        <h4 className="line-clamp-2 text-[13px] font-semibold leading-4" style={{ color: learningTheme.colors.textPrimary }}>{course.title}</h4>
        <p className="mt-1 text-[11px]" style={{ color: learningTheme.colors.textSecondary }}>{course.instructor}</p>
        <RatingRow rating={course.rating} reviews={course.reviews} />
        <p className="mt-1 text-sm font-bold" style={{ color: learningTheme.colors.primary }}>${course.price.toFixed(2)}</p>
      </div>
    </motion.button>
  );
}
