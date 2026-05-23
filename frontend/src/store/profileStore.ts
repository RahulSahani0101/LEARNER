import { create } from "zustand";

const PROFILE_STORAGE_KEY = "jdm_profile_preferences";

export interface ProfilePreferences {
  mobile: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
  emailUpdates: boolean;
  pushAlerts: boolean;
  weeklyDigest: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
}

const defaultProfile: ProfilePreferences = {
  mobile: "+91 00000 00000",
  bio: "Spring Boot developer focused on scalable APIs, authentication, and interview-grade architecture.",
  skills: ["Spring Boot", "Java", "MySQL", "REST APIs", "Docker", "System Design"],
  avatarUrl: "/avatars/rahul-sahani.jpg",
  emailUpdates: true,
  pushAlerts: true,
  weeklyDigest: true,
  darkMode: true,
  twoFactorAuth: false,
};

function safeGetItem(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    // Ignore storage write errors (private mode / quota).
  }
}

function safeRemoveItem(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // Ignore storage removal errors.
  }
}

function persistProfile(profile: ProfilePreferences): void {
  const payload = JSON.stringify(profile);
  safeSetItem(localStorage, PROFILE_STORAGE_KEY, payload);
  safeSetItem(sessionStorage, PROFILE_STORAGE_KEY, payload);
}

function loadStoredProfile(): ProfilePreferences {
  const rawValue = safeGetItem(localStorage, PROFILE_STORAGE_KEY) ?? safeGetItem(sessionStorage, PROFILE_STORAGE_KEY);
  if (!rawValue) {
    return defaultProfile;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ProfilePreferences>;
    return {
      ...defaultProfile,
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaultProfile.skills,
    };
  } catch {
    return defaultProfile;
  }
}

interface ProfileStore extends ProfilePreferences {
  update: (payload: Partial<ProfilePreferences>) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  ...loadStoredProfile(),
  update: (payload) => {
    set((state) => {
      const nextState = { ...state, ...payload };
      const persistableState: ProfilePreferences = {
        mobile: nextState.mobile,
        bio: nextState.bio,
        skills: nextState.skills,
        avatarUrl: nextState.avatarUrl,
        emailUpdates: nextState.emailUpdates,
        pushAlerts: nextState.pushAlerts,
        weeklyDigest: nextState.weeklyDigest,
        darkMode: nextState.darkMode,
        twoFactorAuth: nextState.twoFactorAuth,
      };
      persistProfile(persistableState);
      return nextState;
    });
  },
  reset: () => {
    safeRemoveItem(localStorage, PROFILE_STORAGE_KEY);
    safeRemoveItem(sessionStorage, PROFILE_STORAGE_KEY);
    set(defaultProfile);
  },
}));
