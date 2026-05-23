import { useMemo } from "react";
import {
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Crown,
  Folder,
  Gauge,
  Layers,
  ListChecks,
  LogOut,
  Mic2,
  Network,
  Settings,
  Trophy,
  UserCircle2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { useUiStore } from "../../store/uiStore";

const navItems: Array<{ to: string; label: string; icon: typeof Gauge; adminOnly?: boolean }> = [
  { to: "/dashboard", label: "Learning Dashboard", icon: Gauge },
  { to: "/courses", label: "Learning Paths", icon: Layers },
  { to: "/roadmap", label: "Study Plan", icon: Network },
  { to: "/topics/spring-rest", label: "Focus Topic", icon: BookOpen },
  { to: "/dsa", label: "DSA Tracker", icon: Code2 },
  { to: "/interview-prep", label: "Interview Prep", icon: Mic2 },
  { to: "/ai-mentor", label: "AI Mentor", icon: Bot },
  { to: "/projects", label: "Projects", icon: BrainCircuit },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/community", label: "Community", icon: Crown },
  { to: "/profile", label: "Profile", icon: UserCircle2 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/admin", label: "Admin", icon: ListChecks, adminOnly: true },
];

/**
 * Fintech-inspired side navigation with compact icon rail and bottom profile dock.
 */
export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const role = useAuthStore((state) => state.role);
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);
  const avatarUrl = useProfileStore((state) => state.avatarUrl);
  const navigate = useNavigate();

  const filteredNavItems = useMemo(() => navItems.filter((item) => !item.adminOnly || role === "ROLE_ADMIN"), [role]);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[304px] transform rounded-r-[1.75rem] border-r border-white/10 bg-[#0c101b]/96 p-3 backdrop-blur-xl transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
        aria-label="Primary navigation"
      >
        <div className="grid h-full grid-cols-[52px_1fr] gap-3">
          <div className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-2.5">
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue text-white shadow-neonPurple" aria-label="Brand Home" onClick={() => navigate("/dashboard")}>
              <span className="text-sm font-bold">C</span>
            </button>

            <div className="mt-4 flex flex-1 flex-col items-center gap-3 text-brand-muted">
              <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-brand-text" aria-label="Quick dashboard" onClick={() => navigate("/dashboard")}>
                <Gauge className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-brand-text" aria-label="Quick notifications" onClick={() => navigate("/settings")}>
                <Bell className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-brand-text" aria-label="Quick resources" onClick={() => navigate("/projects")}>
                <Folder className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-brand-text" aria-label="Quick settings" onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4" />
              </button>
            </div>

            <button
              className="h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-black/40 p-0 transition hover:border-brand-blue/60"
              aria-label="Open profile"
              onClick={() => navigate("/profile")}
            >
              <img
                src={avatarUrl}
                alt={fullName || "Rahul Sahani"}
                className="h-full w-full aspect-square object-cover object-center"
                loading="lazy"
              />
            </button>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0f1422]/85 p-3">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="font-heading text-lg font-semibold gradient-text">CODESA</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-muted">Main Menu</p>
              </div>
              <button className="rounded-md p-2 text-brand-muted hover:bg-white/5 hover:text-white lg:hidden" onClick={closeSidebar} aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-1 overflow-y-auto pr-1">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={`${item.to}-${item.label}`}
                    to={item.to}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-brand-purple/95 to-brand-blue/95 text-white shadow-neonPurple"
                          : "text-brand-muted hover:bg-white/5 hover:text-brand-text",
                      )
                    }
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 pt-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                onClick={() => {
                  logout();
                  closeSidebar();
                  navigate("/login", { replace: true });
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen ? <button className="fixed inset-0 z-30 bg-black/55 lg:hidden" aria-label="Close menu overlay" onClick={closeSidebar} /> : null}
    </>
  );
}
