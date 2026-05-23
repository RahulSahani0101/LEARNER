import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BulletList } from "../components/BulletList";
import { HeroHeader } from "../components/HeroHeader";
import { RatingRow } from "../components/RatingRow";
import { StatBadge } from "../components/StatBadge";
import { popularCourses } from "../data/courses";
import { learningTheme } from "../theme/tokens";

export function CourseDetailLearningScreen() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const course = useMemo(() => popularCourses.find((item) => item.id === courseId) ?? popularCourses[0], [courseId]);

  return (
    <div className="min-h-[100svh] bg-[#F6F7FB]">
      <div className="mx-auto max-w-md pb-24">
        <HeroHeader course={course} onBack={() => navigate(-1)} />

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="relative -mt-5 rounded-t-[24px] bg-white px-4 pb-5 pt-4"
        >
          <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: learningTheme.colors.badge }}>Bestseller</span>

          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold leading-7" style={{ color: learningTheme.colors.textPrimary }}>{course.title}</h1>
            <p className="text-2xl font-bold" style={{ color: learningTheme.colors.primary }}>${course.price.toFixed(2)}</p>
          </div>

          <p className="mt-2 text-sm" style={{ color: learningTheme.colors.textSecondary }}>{course.description}</p>

          <div className="mt-3 flex flex-wrap gap-4 border-b border-[#EEF0F4] pb-3">
            <StatBadge icon="??" label={`${course.lessons} Lesson`} />
            <StatBadge icon="?" label={course.duration} />
            <StatBadge icon="??" label={`${course.enrolled} Enrolled`} />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold" style={{ color: learningTheme.colors.textPrimary }}>What you'll learn</h2>
            <div className="mt-3">
              <BulletList items={course.learnPoints} expanded={expanded} />
            </div>
            <button type="button" onClick={() => setExpanded((current) => !current)} className="mt-2 text-sm font-medium" style={{ color: learningTheme.colors.primary }}>
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#EEF0F4] bg-[#FCFCFD] p-3">
            <div className="flex items-center gap-3">
              <img src="/avatars/rahul-sahani.jpg" alt="Instructor" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold" style={{ color: learningTheme.colors.textPrimary }}>{course.instructor}</p>
                <RatingRow rating={course.rating} reviews={course.reviews} />
              </div>
            </div>
            <button type="button" className="rounded-full border border-[#ECEEF2] bg-white p-2">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>

        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 p-3 backdrop-blur-sm">
          <div className="mx-auto max-w-md space-y-2">
            <motion.button
              type="button"
              animate={{ boxShadow: ["0 8px 24px rgba(255,140,66,0.22)", "0 8px 30px rgba(255,140,66,0.38)", "0 8px 24px rgba(255,140,66,0.22)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileTap={{ scale: 0.96 }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: `linear-gradient(90deg, ${learningTheme.colors.primary}, ${learningTheme.colors.primaryLight})` }}
            >
              <ShoppingCart className="h-4 w-4" />
              Buy now
            </motion.button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="h-11 rounded-xl border text-sm font-medium" style={{ borderColor: "#DDE1E8", color: learningTheme.colors.textPrimary }}>Add to cart</button>
              <button type="button" className="h-11 rounded-xl border text-sm font-medium" style={{ borderColor: "#DDE1E8", color: learningTheme.colors.textPrimary }}>Add to wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
