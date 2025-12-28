"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import {
    PayersViewModel,
    usePayersPresenter,
} from "@/src/presentation/presenters/payers";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainPayers } from "./MainPayers";
import { RetroPayers } from "./RetroPayers";

interface PayersViewProps {
  initialViewModel?: PayersViewModel;
}

/**
 * PayersView - Layout-aware component
 */
export function PayersView({ initialViewModel }: PayersViewProps) {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [state, actions] = usePayersPresenter(initialViewModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse text-4xl">👥</div>
        </div>
      </div>
    );
  }

  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroPayers state={state} actions={actions} />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainPayers state={state} actions={actions} />
    </MainLayout>
  );
}
