import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  rightRailOpen: boolean;
  toggleSidebar: () => void;
  toggleRightRail: () => void;
  closeSidebar: () => void;
}

/**
 * UI-only state for responsive shell controls.
 */
export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  rightRailOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleRightRail: () => set((state) => ({ rightRailOpen: !state.rightRailOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
}));
