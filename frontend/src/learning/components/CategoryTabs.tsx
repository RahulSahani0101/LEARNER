import { motion } from "framer-motion";
import { categories } from "../data/courses";
import { learningTheme } from "../theme/tokens";

interface CategoryTabsProps {
  selected: string;
  onSelect: (value: string) => void;
}

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((item) => {
        const isActive = item === selected;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="relative whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold"
            style={{
              borderColor: isActive ? "transparent" : "#E5E7EB",
              color: isActive ? "#FFFFFF" : learningTheme.colors.textPrimary,
              background: isActive ? "transparent" : "#FFFFFF",
            }}
          >
            {isActive ? (
              <motion.span
                layoutId="active-category-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: `linear-gradient(130deg, ${learningTheme.colors.primary}, ${learningTheme.colors.primaryLight})`,
                  boxShadow: learningTheme.shadow.button,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              />
            ) : null}
            {item}
          </button>
        );
      })}
    </div>
  );
}
