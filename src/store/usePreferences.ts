import { create } from "zustand";

type PreferencesState = {
  soundEnabled: boolean;
  setSoundEnabled: (soundEnabled: boolean) => void;
}

export const usePreferences = create<PreferencesState>((set) => ({
  soundEnabled: true,
  setSoundEnabled: (soundEnabled: boolean) => set({ soundEnabled }),
}));
