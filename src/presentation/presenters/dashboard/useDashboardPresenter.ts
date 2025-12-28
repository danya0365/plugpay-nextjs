"use client";

import { useCallback, useEffect, useState } from "react";
import {
    DashboardPresenterFactory,
    DashboardViewModel,
} from "./DashboardPresenter";

const presenter = DashboardPresenterFactory.createClient();

export interface DashboardPresenterState {
  viewModel: DashboardViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Dashboard presenter
 */
export function useDashboardPresenter(
  userId: string,
  initialViewModel?: DashboardViewModel
): [DashboardPresenterState, DashboardPresenterActions] {
  const [viewModel, setViewModel] = useState<DashboardViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [userId, initialViewModel, loadData]);

  return [
    { viewModel, loading, error },
    { loadData, setError },
  ];
}
