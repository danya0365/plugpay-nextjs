"use client";

import type { CreateInvoiceData, Invoice } from "@/src/domain/types";
import { useCallback, useEffect, useState } from "react";
import { InvoicesPresenterFactory, InvoicesViewModel } from "./InvoicesPresenter";

const presenter = InvoicesPresenterFactory.createClient();

export interface InvoicesPresenterState {
  viewModel: InvoicesViewModel | null;
  loading: boolean;
  error: string | null;
  isCreateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedInvoice: Invoice | null;
}

export interface InvoicesPresenterActions {
  loadData: () => Promise<void>;
  createInvoice: (data: CreateInvoiceData) => Promise<void>;
  updateStatus: (id: string, status: Invoice["status"]) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openDeleteModal: (invoice: Invoice) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
}

export function useInvoicesPresenter(
  userId: string,
  initialViewModel?: InvoicesViewModel
): [InvoicesPresenterState, InvoicesPresenterActions] {
  const [viewModel, setViewModel] = useState<InvoicesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

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

  const createInvoice = useCallback(
    async (data: CreateInvoiceData) => {
      setLoading(true);
      try {
        await presenter.createInvoice(data);
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

  const updateStatus = useCallback(
    async (id: string, status: Invoice["status"]) => {
      setLoading(true);
      try {
        await presenter.updateStatus(id, status);
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

  const deleteInvoice = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await presenter.deleteInvoice(id);
        setIsDeleteModalOpen(false);
        setSelectedInvoice(null);
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
      selectedInvoice,
    },
    {
      loadData,
      createInvoice,
      updateStatus,
      deleteInvoice,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeCreateModal: () => setIsCreateModalOpen(false),
      openDeleteModal: (invoice) => {
        setSelectedInvoice(invoice);
        setIsDeleteModalOpen(true);
      },
      closeDeleteModal: () => {
        setIsDeleteModalOpen(false);
        setSelectedInvoice(null);
      },
      setError,
    },
  ];
}
