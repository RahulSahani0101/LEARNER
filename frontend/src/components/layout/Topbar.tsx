import { useState } from "react";
import { Bell, Flame, Menu, Search, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

/**
 * Top navigation with search, notifications, streak, and XP metrics.
 */
export function Topbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const navigate = useNavigate();
  const fullName = useAuthStore((state) => state.fullName);
  const [query, setQuery] = useState("");

  return (
    <header className="glass-card sticky top-3 z-20 mx-3 mt-3 rounded-2xl p-3 lg:mx-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-brand-muted hover:bg-white/5 hover:text-brand-text lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form
          className="relative min-w-[220px] flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmedQuery = query.trim();
            if (!trimmedQuery) {
              navigate("/courses");
              return;
            }

            navigate(`/ai-mentor?q=${encodeURIComponent(trimmedQuery)}`);
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <input
            aria-label="Search content"
            placeholder="Search Java topics, roadmaps, DSA patterns"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-cyan/60 focus:outline-none"
          />
        </form>

        <button
          type="button"
          aria-label="AI search"
          className="glass-card flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-brand-muted hover:text-brand-text"
          onClick={() => navigate(`/ai-mentor${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`)}
        >
          <Sparkles className="h-4 w-4 text-brand-cyan" />
          AI Search
        </button>

        <button aria-label="Notifications" className="rounded-xl p-2 text-brand-muted hover:bg-white/5 hover:text-brand-text">
          <Bell className="h-4 w-4" />
        </button>

        <div className="glass-card flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-brand-muted">Streak</span>
          <span className="font-semibold text-brand-text">5 days</span>
        </div>

        <div className="glass-card flex items-center gap-2 rounded-xl px-3 py-2 text-xs">
          <Zap className="h-4 w-4 text-brand-cyan" />
          <span className="text-brand-muted">XP</span>
          <span className="font-semibold text-brand-text">1250</span>
        </div>

        {fullName ? (
          <div className="glass-card rounded-xl px-3 py-2 text-xs text-brand-muted">
            Signed in as <span className="font-semibold text-brand-text">{fullName}</span>
          </div>
        ) : null}
      </div>
    </header>
  );
}
