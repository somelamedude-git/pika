// store/themeStore.js
import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: 0, // 0 = Morning, 1 = Night
  setTheme: (value) => set({ theme: value }),
}));

export default useThemeStore;
