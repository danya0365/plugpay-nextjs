import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutType = "main" | "retro";

interface LayoutState {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  toggleLayout: () => void;
}

/**
 * Zustand store for layout state management
 * Persists the selected layout in localStorage
 */
export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      layout: "main",
      setLayout: (layout: LayoutType) => set({ layout }),
      toggleLayout: () =>
        set({ layout: get().layout === "main" ? "retro" : "main" }),
    }),
    {
      name: "plugpay-layout",
    }
  )
);
