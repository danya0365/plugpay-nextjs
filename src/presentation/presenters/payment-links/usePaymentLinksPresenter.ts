"use client";

import type { CreatePaymentLinkData, PaymentLink } from "@/src/domain/types";
import { useCallback, useEffect, useState } from "react";
import {
    PaymentLinksPresenterFactory,
    PaymentLinksViewModel,
} from "./PaymentLinksPresenter";

const presenter = PaymentLinksPresenterFactory.createClient();

export interface PaymentLinksPresenterState {
  viewModel: PaymentLinksViewModel | null;
  loading: boolean;
  error: string | null;
  isCreateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedLink: PaymentLink | null;
}

export interface PaymentLinksPresenterActions {
  loadData: () => Promise<void>;
  createPaymentLink: (data: CreatePaymentLinkData) => Promise<void>;
  deletePaymentLink: (id: string) => Promise<void>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openDeleteModal: (link: PaymentLink) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
}

export function usePaymentLinksPresenter(
  userId: string,
  initialViewModel?: PaymentLinksViewModel
): [PaymentLinksPresenterState, PaymentLinksPresenterActions] {
  const [viewModel, setViewModel] = useState<PaymentLinksViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createPaymentLink = useCallback(
    async (data: CreatePaymentLinkData) => {
      setLoading(true);
      try {
        await presenter.createPaymentLink(data);
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

  const deletePaymentLink = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await presenter.deletePaymentLink(id);
        setIsDeleteModalOpen(false);
        setSelectedLink(null);
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
  }, [userId, initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      isCreateModalOpen,
      isDeleteModalOpen,
      selectedLink,
    },
    {
      loadData,
      createPaymentLink,
      deletePaymentLink,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeCreateModal: () => setIsCreateModalOpen(false),
      openDeleteModal: (link) => {
        setSelectedLink(link);
        setIsDeleteModalOpen(true);
      },
      closeDeleteModal: () => {
        setIsDeleteModalOpen(false);
        setSelectedLink(null);
      },
      setError,
    },
  ];
}
