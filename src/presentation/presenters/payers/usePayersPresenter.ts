"use client";

import type { CreatePayerData, Payer } from "@/src/domain/types";
import { useCallback, useEffect, useState } from "react";
import { PayersPresenterFactory, PayersViewModel } from "./PayersPresenter";

const presenter = PayersPresenterFactory.createClient();

export interface PayersPresenterState {
  viewModel: PayersViewModel | null;
  loading: boolean;
  error: string | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedPayer: Payer | null;
}

export interface PayersPresenterActions {
  loadData: () => Promise<void>;
  createPayer: (data: CreatePayerData) => Promise<void>;
  updatePayer: (id: string, data: Partial<Payer>) => Promise<void>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (payer: Payer) => void;
  closeEditModal: () => void;
  setError: (error: string | null) => void;
}

export function usePayersPresenter(
  initialViewModel?: PayersViewModel
): [PayersPresenterState, PayersPresenterActions] {
  const [viewModel, setViewModel] = useState<PayersViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayer, setSelectedPayer] = useState<Payer | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const createPayer = useCallback(
    async (data: CreatePayerData) => {
      setLoading(true);
      try {
        await presenter.createPayer(data);
        setIsCreateModalOpen(false);
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  const updatePayer = useCallback(
    async (id: string, data: Partial<Payer>) => {
      setLoading(true);
      try {
        await presenter.updatePayer(id, data);
        setIsEditModalOpen(false);
        setSelectedPayer(null);
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      isCreateModalOpen,
      isEditModalOpen,
      selectedPayer,
    },
    {
      loadData,
      createPayer,
      updatePayer,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeCreateModal: () => setIsCreateModalOpen(false),
      openEditModal: (payer) => {
        setSelectedPayer(payer);
        setIsEditModalOpen(true);
      },
      closeEditModal: () => {
        setIsEditModalOpen(false);
        setSelectedPayer(null);
      },
      setError,
    },
  ];
}
