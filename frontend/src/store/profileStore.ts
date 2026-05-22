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

function loadStoredProfile(): ProfilePreferences {
  const rawValue = localStorage.getItem(PROFILE_STORAGE_KEY);
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
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          mobile: nextState.mobile,
          bio: nextState.bio,
          skills: nextState.skills,
          avatarUrl: nextState.avatarUrl,
          emailUpdates: nextState.emailUpdates,
          pushAlerts: nextState.pushAlerts,
          weeklyDigest: nextState.weeklyDigest,
          darkMode: nextState.darkMode,
          twoFactorAuth: nextState.twoFactorAuth,
        }),
      );
      return nextState;
    });
  },
  reset: () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    set(defaultProfile);
  },
}));
