import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomTabBar } from "../components/BottomTabBar";
import { CategoryTabs } from "../components/CategoryTabs";
import { CourseCard } from "../components/CourseCard";
import { StudyingCard } from "../components/StudyingCard";
import { popularCourses, studyingCourses } from "../data/courses";
import { learningTheme } from "../theme/tokens";

export function ExploreLearningScreen() {
  const [activeCategory, setActiveCategory] = useState("Design");
  const [activeTab, setActiveTab] = useState<"featured" | "search" | "learning" | "wishlist" | "account">("featured");
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (activeCategory === "Design") {
      return popularCourses;
    }

    return [...popularCourses].reverse();
  }, [activeCategory]);

  return (
    <div className="min-h-[100svh] bg-[#F6F7FB] px-3 pb-20 pt-4">
      <div className="mx-auto max-w-md">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 flex items-center justify-between px-2">
          <h1 className="text-[30px] font-bold" style={{ color: learningTheme.colors.textPrimary }}>Explore</h1>
          <button type="button" className="relative rounded-full border border-[#E8EAF0] bg-white p-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-[#FF6B35] px-1 text-[10px] text-white">2</span>
          </button>
        </motion.header>

        <CategoryTabs selected={activeCategory} onSelect={setActiveCategory} />

        <section className="mt-4 rounded-2xl bg-white p-3" style={{ boxShadow: learningTheme.shadow.card }}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: learningTheme.colors.textPrimary }}>Most Popular</h2>
            <button type="button" className="text-xs font-medium" style={{ color: learningTheme.colors.primary }}>See All ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <CourseCard course={course} onOpen={() => navigate(`/course/${course.id}`)} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-3" style={{ boxShadow: learningTheme.shadow.card }}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: learningTheme.colors.textPrimary }}>Studying</h2>
            <button type="button" className="text-xs font-medium" style={{ color: learningTheme.colors.primary }}>View Watch History ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {studyingCourses.map((item) => (
              <StudyingCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <BottomTabBar active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
