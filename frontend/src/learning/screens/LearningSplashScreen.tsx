import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { learningTheme } from "../theme/tokens";

export function LearningSplashScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-8"
      style={{ background: `linear-gradient(180deg, ${learningTheme.colors.onboardingBg}, ${learningTheme.colors.onboardingEnd})` }}
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="pointer-events-none absolute left-1/2 top-[11%] -translate-x-1/2 text-[112px] font-black tracking-[0.18em] text-white"
      >
        LEARN
      </motion.p>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative z-10 mx-auto mt-12 h-[44svh] max-w-xs"
      >
        <motion.img
          src="/learning/learning-hero.webp"
          alt="Learning illustration"
          className="h-full w-full rounded-[36px] object-cover"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 mt-8 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } },
          }}
          className="mx-auto max-w-sm text-[30px] font-bold uppercase leading-8 text-white"
        >
          {"SUCCESS IS LEARNING, LEARN TO SUCCEED".split("").map((char, idx) => (
            <motion.span key={`${char}-${idx}`} variants={{ hidden: { opacity: 0, x: -4 }, visible: { opacity: 1, x: 0 } }}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.72 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-4 max-w-xs text-sm text-white"
        >
          Explore more skill, because you are smarter than you think.
        </motion.p>

        <motion.button
          type="button"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/explore")}
          className="relative mx-auto mt-8 flex h-14 w-[82%] max-w-xs items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1A1A2E] text-sm font-semibold text-white"
        >
          <motion.span
            className="absolute inset-y-0 -left-20 w-16 bg-white/20"
            animate={{ x: [0, 320] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
          <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: learningTheme.colors.primary }}>
            <ArrowRight className="h-4 w-4" />
          </span>
          Swipe to get started
        </motion.button>
      </div>
    </div>
  );
}
