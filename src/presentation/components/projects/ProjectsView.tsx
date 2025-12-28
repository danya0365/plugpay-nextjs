"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import {
    ProjectsViewModel,
    useProjectsPresenter,
} from "@/src/presentation/presenters/projects";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainProjects } from "./MainProjects";
import { RetroProjects } from "./RetroProjects";

interface ProjectsViewProps {
  initialViewModel?: ProjectsViewModel;
}

/**
 * ProjectsView - Layout-aware projects component
 */
export function ProjectsView({ initialViewModel }: ProjectsViewProps) {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [state, actions] = useProjectsPresenter("user-1", initialViewModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse text-4xl">📁</div>
        </div>
      </div>
    );
  }

  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroProjects state={state} actions={actions} />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainProjects state={state} actions={actions} />
    </MainLayout>
  );
}
