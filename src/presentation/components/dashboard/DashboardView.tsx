"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import {
    DashboardViewModel,
    useDashboardPresenter,
} from "@/src/presentation/presenters/dashboard";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainDashboard } from "./MainDashboard";
import { RetroDashboard } from "./RetroDashboard";

interface DashboardViewProps {
  initialViewModel?: DashboardViewModel;
}

/**
 * DashboardView - Layout-aware dashboard component
 */
export function DashboardView({ initialViewModel }: DashboardViewProps) {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [state, actions] = useDashboardPresenter("user-1", initialViewModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse text-4xl">📊</div>
        </div>
      </div>
    );
  }

  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroDashboard state={state} actions={actions} />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainDashboard state={state} actions={actions} />
    </MainLayout>
  );
}
