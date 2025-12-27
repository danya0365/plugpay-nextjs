"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainLanding } from "./MainLanding";
import { RetroLanding } from "./RetroLanding";

/**
 * LandingView - Layout-aware landing page component
 * Renders either MainLanding or RetroLanding based on selected layout
 */
export function LandingView() {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse">
            <div className="text-4xl">🔌</div>
          </div>
        </div>
      </div>
    );
  }

  // Render based on selected layout
  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroLanding />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainLanding />
    </MainLayout>
  );
}
