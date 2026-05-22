import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Camera, Check, Lock, Mail, Phone, Save, Shield, Sparkles } from "lucide-react";
import { Button } from "../components/common/Button";
import { GlassCard } from "../components/common/GlassCard";
import { SectionHeader } from "../components/common/SectionHeader";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";

const MAX_UPLOAD_MB = 4;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const recentActivity = [
  { label: "Completed Spring Security JWT Quiz", time: "Today, 8:35 PM" },
  { label: "Finished Topic: REST API Design", time: "Today, 6:10 PM" },
  { label: "Updated profile skills", time: "Yesterday, 9:15 PM" },
  { label: "Joined Mock Interview Session", time: "Yesterday, 7:00 PM" },
];

function centerCropAndResize(file: File, size = 420): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Unable to process image."));
        return;
      }

      const sourceSize = Math.min(image.width, image.height);
      const sourceX = (image.width - sourceSize) / 2;
      const sourceY = (image.height - sourceSize) / 2;

      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      URL.revokeObjectURL(objectUrl);
      resolve(dataUrl);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Invalid image file."));
    };

    image.src = objectUrl;
  });
}

/**
 * Full profile workspace for identity, settings, notifications, and account preferences.
 */
export function ProfilePage() {
  const fullName = useAuthStore((state) => state.fullName) || "Rahul Sahani";
  const email = useAuthStore((state) => state.email) || "demo@javadevmastery.com";

  const profile = useProfileStore((state) => ({
    mobile: state.mobile,
    bio: state.bio,
    skills: state.skills,
    avatarUrl: state.avatarUrl,
    emailUpdates: state.emailUpdates,
    pushAlerts: state.pushAlerts,
    weeklyDigest: state.weeklyDigest,
    darkMode: state.darkMode,
    twoFactorAuth: state.twoFactorAuth,
  }));

  const updateProfile = useProfileStore((state) => state.update);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState(fullName);
  const [mobile, setMobile] = useState(profile.mobile);
  const [bio, setBio] = useState(profile.bio);
  const [skillInput, setSkillInput] = useState(profile.skills.join(", "));
  const [newPassword, setNewPassword] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const skillList = useMemo(
    () => skillInput.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 10),
    [skillInput],
  );

  const learningStats = useMemo(
    () => [
      { label: "Current Level", value: "Level 4" },
      { label: "Total XP", value: "1250" },
      { label: "Topics Completed", value: "8" },
      { label: "Interview Readiness", value: "74%" },
    ],
    [],
  );

  const saveProfile = () => {
    updateProfile({
      mobile,
      bio,
      skills: skillList,
    });
    setSaveMessage("Profile updated successfully.");
    window.setTimeout(() => setSaveMessage(""), 2200);
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setUploadError(`Image should be less than ${MAX_UPLOAD_MB}MB.`);
      return;
    }

    try {
      const resizedDataUrl = await centerCropAndResize(file);
      updateProfile({ avatarUrl: resizedDataUrl });
      setUploadError("");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Profile & Account" description="Manage identity, credentials, notifications, and security from one polished workspace." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <img src={profile.avatarUrl} alt={name} className="h-24 w-24 rounded-2xl border border-brand-blue/50 object-cover" />
              <button
                type="button"
                className="absolute -bottom-2 -right-2 rounded-full border border-white/15 bg-brand-bg2 p-2 text-brand-blue"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-xl font-semibold text-brand-text">{name || "Rahul Sahani"}</h3>
              <p className="text-sm text-brand-muted">Backend Engineer (Spring Boot)</p>
              <p className="text-xs text-brand-muted">Upload auto-crops to a high-quality square preview for consistent UI.</p>
            </div>
          </div>

          {uploadError ? <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">{uploadError}</p> : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-brand-muted">Name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5" />
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-brand-muted">Email</span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <Mail className="h-4 w-4 text-brand-muted" />
                <span className="text-sm">{email}</span>
              </div>
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-brand-muted">Mobile Number</span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <Phone className="h-4 w-4 text-brand-muted" />
                <input value={mobile} onChange={(event) => setMobile(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
              </div>
            </label>

            <label className="text-sm">
              <span className="mb-1 block text-brand-muted">New Password</span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <Lock className="h-4 w-4 text-brand-muted" />
                <input
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  type="password"
                  placeholder="Minimum 8 characters"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Bio / About</span>
            <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5" />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Skills / Interests (comma separated)</span>
            <input value={skillInput} onChange={(event) => setSkillInput(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5" />
          </label>

          <div className="flex flex-wrap gap-2">
            {skillList.map((skill) => (
              <span key={skill} className="rounded-full border border-brand-blue/40 bg-brand-blue/15 px-3 py-1 text-xs text-brand-blue">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={saveProfile}>
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
            {saveMessage ? (
              <p className="inline-flex items-center gap-2 text-xs text-emerald-300">
                <Check className="h-3.5 w-3.5" />
                {saveMessage}
              </p>
            ) : null}
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-heading text-lg font-semibold">Notification Preferences</h3>
            <div className="mt-3 space-y-2 text-sm">
              <ToggleRow
                label="Email updates"
                checked={profile.emailUpdates}
                onChange={(value) => updateProfile({ emailUpdates: value })}
              />
              <ToggleRow
                label="Push alerts"
                checked={profile.pushAlerts}
                onChange={(value) => updateProfile({ pushAlerts: value })}
              />
              <ToggleRow
                label="Weekly digest"
                checked={profile.weeklyDigest}
                onChange={(value) => updateProfile({ weeklyDigest: value })}
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-heading text-lg font-semibold">Security & Theme</h3>
            <div className="mt-3 space-y-2 text-sm">
              <ToggleRow
                label="Dark theme"
                checked={profile.darkMode}
                onChange={(value) => updateProfile({ darkMode: value })}
              />
              <ToggleRow
                label="Two-factor authentication"
                checked={profile.twoFactorAuth}
                onChange={(value) => updateProfile({ twoFactorAuth: value })}
              />
            </div>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-brand-muted">
              <Shield className="h-3.5 w-3.5 text-brand-cyan" />
              Security posture: {profile.twoFactorAuth ? "Hardened" : "Standard"}
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="font-heading text-lg font-semibold">Learning Statistics</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {learningStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs text-brand-muted">{stat.label}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-heading text-lg font-semibold">Recent Activity</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-muted">
              {recentActivity.map((entry) => (
                <li key={entry.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-medium text-brand-text">{entry.label}</p>
                  <p className="mt-1 text-xs text-brand-muted">{entry.time}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-brand-muted">
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              Account management and profile data are persisted locally for quick access.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
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
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-[1.3rem]" : "left-0.5"}`}
          aria-hidden="true"
        />
      </button>
    </label>
  );
}
