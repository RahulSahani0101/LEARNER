import { Compass, Heart, Home, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { learningTheme } from "../theme/tokens";

type TabKey = "featured" | "search" | "learning" | "wishlist" | "account";

interface BottomTabBarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

const tabs: Array<{ key: TabKey; label: string; icon: typeof Home }> = [
  { key: "featured", label: "Featured", icon: Home },
  { key: "search", label: "Search", icon: Search },
  { key: "learning", label: "My Learning", icon: Compass },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "account", label: "Account", icon: UserRound },
];

export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  return (
    <div
      className="sticky bottom-0 z-30 mt-2 grid grid-cols-5 gap-1 rounded-t-3xl border px-1 pb-2 pt-2"
      style={{ background: "#FFFFFF", borderColor: "#EAECEF", boxShadow: learningTheme.shadow.tab }}
    >
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <motion.button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            whileTap={{ scale: 0.95 }}
            animate={isActive ? { y: -2 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: idx * 0.01 }}
            className="relative flex min-h-[44px] flex-col items-center justify-center rounded-xl p-1"
          >
            {isActive ? <span className="mb-1 h-1.5 w-1.5 rounded-full" style={{ background: learningTheme.colors.tabActive }} /> : <span className="mb-1 h-1.5 w-1.5" />}
            <Icon className="h-4 w-4" style={{ color: isActive ? learningTheme.colors.tabActive : learningTheme.colors.tabInactive }} />
            <span className="mt-0.5 text-[10px]" style={{ color: isActive ? learningTheme.colors.tabActive : learningTheme.colors.tabInactive }}>{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
