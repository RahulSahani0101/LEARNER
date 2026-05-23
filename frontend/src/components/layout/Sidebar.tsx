import { useMemo } from "react";
import {
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Crown,
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { useUiStore } from "../../store/uiStore";

const navItems: Array<{ to: string; label: string; icon: typeof Gauge; adminOnly?: boolean }> = [
  { to: "/dashboard", label: "Home", icon: Gauge },
  { to: "/courses", label: "Courses", icon: Layers },
  { to: "/roadmap", label: "Roadmaps", icon: Network },
  { to: "/topics/spring-rest", label: "Focus Topic", icon: BookOpen },
  { to: "/dsa", label: "DSA Tracker", icon: Code2 },
  { to: "/interview-prep", label: "Mock Interviews", icon: Mic2 },
  { to: "/ai-mentor", label: "AI Mentor", icon: Bot },
  { to: "/projects", label: "Projects", icon: BrainCircuit },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/community", label: "Community", icon: Crown },
  { to: "/profile", label: "Profile", icon: UserCircle2 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/admin", label: "Admin", icon: ListChecks, adminOnly: true },
];

/**
 * Left navigation rail with profile identity, quick links, and secure logout.
 */
export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const role = useAuthStore((state) => state.role);
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);
  const avatarUrl = useProfileStore((state) => state.avatarUrl);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredNavItems = useMemo(() => navItems.filter((item) => !item.adminOnly || role === "ROLE_ADMIN"), [role]);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/10 bg-brand-bg2/95 p-4 backdrop-blur-glass transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
        aria-label="Primary navigation"
      >
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div>
            <p className="font-heading text-lg font-semibold tracking-wide gradient-text">CODESA</p>
            <p className="text-xs text-brand-muted">Premium Java Engineering Platform</p>
          </div>
          <button
            className="rounded-md p-2 text-brand-muted hover:bg-white/5 hover:text-white lg:hidden"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
          <img src={avatarUrl} alt={fullName || "Profile"} className="h-11 w-11 rounded-full border border-brand-blue/60 object-cover" loading="lazy" />
          <div>
            <p className="text-sm font-semibold text-brand-text">{fullName || "Rahul Sahani"}</p>
            <p className="text-xs text-brand-muted">{location.pathname === "/dashboard" ? "Dashboard Overview" : "In Learning Flow"}</p>
          </div>
        </div>

        <nav className="space-y-1.5">
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
                      ? "bg-gradient-to-r from-brand-purple/80 to-brand-blue text-[#1d1507] shadow-neonPurple"
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

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
          onClick={() => {
            logout();
            closeSidebar();
            navigate("/login", { replace: true });
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </aside>
      {sidebarOpen ? <button className="fixed inset-0 z-30 bg-black/55 lg:hidden" aria-label="Close menu overlay" onClick={closeSidebar} /> : null}
    </>
  );
}
