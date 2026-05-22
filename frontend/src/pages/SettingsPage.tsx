import { useMemo } from "react";
import { Bell, ShieldCheck, Timer, Trash2 } from "lucide-react";
import { Button } from "../components/common/Button";
import { GlassCard } from "../components/common/GlassCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";

/**
 * Settings page with product behavior, notifications, security posture, and account actions.
 */
export function SettingsPage() {
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore((state) => ({
    emailUpdates: state.emailUpdates,
    pushAlerts: state.pushAlerts,
    weeklyDigest: state.weeklyDigest,
    darkMode: state.darkMode,
    twoFactorAuth: state.twoFactorAuth,
  }));
  const updateProfile = useProfileStore((state) => state.update);

  const readinessSignal = useMemo(() => {
    if (profile.twoFactorAuth && profile.weeklyDigest) {
      return "Strong configuration";
    }

    if (profile.twoFactorAuth || profile.weeklyDigest) {
      return "Balanced configuration";
    }

    return "Basic configuration";
  }, [profile.twoFactorAuth, profile.weeklyDigest]);

  return (
    <div className="space-y-5">
      <SectionHeader title="Settings" description="Control notifications, security defaults, and account behavior with production-ready preferences." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <GlassCard>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-brand-blue" />
            <h3 className="font-heading text-lg font-semibold">Notifications</h3>
          </div>
          <div className="mt-3 space-y-3 text-sm">
            <ToggleRow label="Email updates" checked={profile.emailUpdates} onChange={(checked) => updateProfile({ emailUpdates: checked })} />
            <ToggleRow label="Push alerts" checked={profile.pushAlerts} onChange={(checked) => updateProfile({ pushAlerts: checked })} />
            <ToggleRow label="Weekly progress digest" checked={profile.weeklyDigest} onChange={(checked) => updateProfile({ weeklyDigest: checked })} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-cyan" />
            <h3 className="font-heading text-lg font-semibold">Security</h3>
          </div>
          <div className="mt-3 space-y-3 text-sm">
            <ToggleRow label="Enable two-factor auth" checked={profile.twoFactorAuth} onChange={(checked) => updateProfile({ twoFactorAuth: checked })} />
            <ToggleRow label="Use dark theme" checked={profile.darkMode} onChange={(checked) => updateProfile({ darkMode: checked })} />
          </div>
          <p className="mt-3 text-xs text-brand-muted">Current posture: <span className="font-semibold text-brand-text">{readinessSignal}</span></p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-brand-blue" />
            <h3 className="font-heading text-lg font-semibold">Learning Rhythm</h3>
          </div>
          <p className="mt-2 text-sm text-brand-muted">
            Keep your daily momentum between 60-90 focused minutes. This keeps interview retention high without burnout.
          </p>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-brand-muted">
            Recommended target: <span className="font-semibold text-brand-text">75 minutes/day</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-red-300" />
            <h3 className="font-heading text-lg font-semibold">Account Management</h3>
          </div>
          <p className="mt-2 text-sm text-brand-muted">Sign out securely from this device. Tokens and local session metadata will be cleared instantly.</p>
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
          >
            Sign out from this device
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <span className="text-brand-muted">{label}</span>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-brand-blue" : "bg-white/15"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-[1.3rem]" : "left-0.5"}`} aria-hidden="true" />
      </button>
    </label>
  );
}
