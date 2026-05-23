import { motion } from "framer-motion";
import { ArrowLeft, Play, Share2, ShoppingCart } from "lucide-react";
import type { CourseItem } from "../data/courses";

interface HeroHeaderProps {
  course: CourseItem;
  onBack: () => void;
}

export function HeroHeader({ course, onBack }: HeroHeaderProps) {
  return (
    <header className="relative h-60 overflow-hidden rounded-b-[26px] px-4 pt-3" style={{ background: "linear-gradient(140deg, #3ABCAD, #2A9D8F)" }}>
      <div className="flex items-center justify-between text-white">
        <button type="button" onClick={onBack} className="rounded-full bg-white/15 p-2">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          <button type="button" className="rounded-full bg-white/15 p-2"><Share2 className="h-4 w-4" /></button>
          <button type="button" className="rounded-full bg-white/15 p-2"><ShoppingCart className="h-4 w-4" /></button>
        </div>
      </div>

      <motion.div
        layoutId={`course-thumb-${course.id}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-4 h-36 w-44 overflow-hidden rounded-2xl"
      >
        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
      </motion.div>

      <button
        type="button"
        className="absolute left-1/2 top-[8.7rem] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-[#2A9D8F] shadow-lg"
      >
        <Play className="ml-0.5 h-5 w-5 fill-current" />
      </button>
    </header>
  );
}
