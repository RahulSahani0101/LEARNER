import { Bot, BrainCircuit, Code2, Crown, Gauge, Layers, ListChecks, Mic2, Network, Settings, Trophy, UserCircle2, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

const navItems: Array<{ to: string; label: string; icon: typeof Gauge; adminOnly?: boolean }> = [
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/courses", label: "Courses", icon: Layers },
  { to: "/dsa", label: "DSA Tracker", icon: Code2 },
  { to: "/interview-prep", label: "Mock Interviews", icon: Mic2 },
  { to: "/ai-mentor", label: "AI Mentor", icon: Bot },
  { to: "/roadmap", label: "Roadmaps", icon: Network },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/projects", label: "Projects", icon: BrainCircuit },
  { to: "/resume-builder", label: "Resume Builder", icon: UserCircle2 },
  { to: "/community", label: "Community", icon: Crown },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/admin", label: "Admin", icon: ListChecks, adminOnly: true },
];

/**
 * Left navigation rail with keyboard-friendly links.
 */
export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const role = useAuthStore((state) => state.role);
  const filteredNavItems = navItems.filter((item) => !item.adminOnly || role === "ROLE_ADMIN");

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/10 bg-brand-bg2/95 p-4 backdrop-blur-glass transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Primary navigation"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-heading text-lg font-semibold gradient-text">JavaDev Mastery</p>
            <p className="text-xs text-brand-muted">Code Today, Build Tomorrow.</p>
          </div>
          <button
            className="rounded-md p-2 text-brand-muted hover:bg-white/5 hover:text-white lg:hidden"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={`${item.to}-${item.label}`}
                to={item.to}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-brand-purple/30 to-brand-blue/30 text-white shadow-neonPurple"
                      : "text-brand-muted hover:bg-white/5 hover:text-brand-text",
                  )
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      {sidebarOpen ? <button className="fixed inset-0 z-30 bg-black/50 lg:hidden" aria-label="Close menu overlay" onClick={closeSidebar} /> : null}
    </>
  );
}
