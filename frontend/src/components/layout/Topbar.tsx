import { useMemo, useState } from "react";
import { Bell, Flame, LogOut, Menu, Search, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { useUiStore } from "../../store/uiStore";

/**
 * Top navigation with search, notifications, streak, and quick identity actions.
 */
export function Topbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const navigate = useNavigate();
  const fullName = useAuthStore((state) => state.fullName);
  const logout = useAuthStore((state) => state.logout);
  const avatarUrl = useProfileStore((state) => state.avatarUrl);
  const [query, setQuery] = useState("");

  const initials = useMemo(() => {
    const parts = fullName.trim().split(" ").filter(Boolean);
    return (parts[0]?.[0] ?? "R") + (parts[1]?.[0] ?? "S");
  }, [fullName]);

  return (
    <header className="glass-card sticky top-3 z-20 mx-3 mt-3 rounded-2xl px-3 py-2.5 lg:mx-6">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-brand-muted hover:bg-white/5 hover:text-brand-text lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form
          className="relative min-w-[200px] flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmedQuery = query.trim();
            navigate(trimmedQuery ? `/ai-mentor?q=${encodeURIComponent(trimmedQuery)}` : "/courses");
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <input
            aria-label="Search content"
            placeholder="Search topics, APIs, interview tracks"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-cyan/60 focus:outline-none"
          />
        </form>

        <button
          type="button"
          aria-label="AI search"
          className="glass-card hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-brand-muted hover:text-brand-text sm:flex"
          onClick={() => navigate(`/ai-mentor${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`)}
        >
          <Sparkles className="h-4 w-4 text-brand-cyan" />
          Ask Mentor
        </button>

        <button aria-label="Notifications" className="rounded-xl p-2 text-brand-muted hover:bg-white/5 hover:text-brand-text">
          <Bell className="h-4 w-4" />
        </button>

        <div className="glass-card hidden items-center gap-2 rounded-xl px-3 py-2 text-xs md:flex">
          <Flame className="h-4 w-4 text-orange-300" />
          <span className="text-brand-muted">Streak</span>
          <span className="font-semibold text-brand-text">5 days</span>
        </div>

        <div className="glass-card hidden items-center gap-2 rounded-xl px-3 py-2 text-xs md:flex">
          <Zap className="h-4 w-4 text-brand-cyan" />
          <span className="text-brand-muted">XP</span>
          <span className="font-semibold text-brand-text">1250</span>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 transition hover:border-brand-blue/70"
        >
          <img src={avatarUrl} alt={fullName || "Profile"} className="h-8 w-8 rounded-full border border-white/15 object-cover" loading="lazy" />
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-tight text-brand-text">{fullName || "Rahul Sahani"}</p>
            <p className="text-[11px] text-brand-muted">{initials.toUpperCase()} Workspace</p>
          </div>
        </button>

        <button
          type="button"
          aria-label="Sign out"
          className="rounded-xl border border-white/10 p-2 text-brand-muted transition hover:border-red-300/40 hover:text-red-200"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
