import { useEffect, useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";

const SETTINGS_KEY = "jdm_user_settings";

/**
 * Settings page for account and study preferences.
 */
export function SettingsPage() {
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [aiNudgesEnabled, setAiNudgesEnabled] = useState(true);
  const [weeklyScoreEnabled, setWeeklyScoreEnabled] = useState(true);
  const [dailyGoal, setDailyGoal] = useState("90");

  useEffect(() => {
    const savedValue = localStorage.getItem(SETTINGS_KEY);
    if (!savedValue) {
      return;
    }

    try {
      const parsedValue = JSON.parse(savedValue) as {
        reminderEnabled: boolean;
        aiNudgesEnabled: boolean;
        weeklyScoreEnabled: boolean;
        dailyGoal: string;
      };

      setReminderEnabled(parsedValue.reminderEnabled);
      setAiNudgesEnabled(parsedValue.aiNudgesEnabled);
      setWeeklyScoreEnabled(parsedValue.weeklyScoreEnabled);
      setDailyGoal(parsedValue.dailyGoal);
    } catch {
      localStorage.removeItem(SETTINGS_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        reminderEnabled,
        aiNudgesEnabled,
        weeklyScoreEnabled,
        dailyGoal,
      }),
    );
  }, [aiNudgesEnabled, dailyGoal, reminderEnabled, weeklyScoreEnabled]);

  return (
    <div className="space-y-4">
      <SectionHeader title="Settings" description="Tune notification, study schedule, and roadmap pacing." />
      <article className="glass-card rounded-2xl p-5">
        <div className="space-y-4 text-sm">
          <label className="flex items-center justify-between gap-3">
            <span className="text-brand-muted">Daily reminder at 8 PM IST</span>
            <input type="checkbox" checked={reminderEnabled} onChange={(event) => setReminderEnabled(event.target.checked)} aria-label="Daily reminder toggle" />
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="text-brand-muted">Enable AI personalized nudges</span>
            <input type="checkbox" checked={aiNudgesEnabled} onChange={(event) => setAiNudgesEnabled(event.target.checked)} aria-label="AI nudge toggle" />
          </label>
          <label className="flex items-center justify-between gap-3">
            <span className="text-brand-muted">Show weekly interview readiness score</span>
            <input type="checkbox" checked={weeklyScoreEnabled} onChange={(event) => setWeeklyScoreEnabled(event.target.checked)} aria-label="Readiness score toggle" />
          </label>
          <label className="block">
            <span className="text-brand-muted">Daily study goal (minutes)</span>
            <input
              value={dailyGoal}
              onChange={(event) => setDailyGoal(event.target.value.replace(/[^0-9]/g, ""))}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-brand-text focus:border-brand-cyan/60 focus:outline-none"
              aria-label="Daily study minutes"
            />
          </label>
        </div>
      </article>
    </div>
  );
}
