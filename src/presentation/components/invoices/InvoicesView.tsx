"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import {
    InvoicesViewModel,
    useInvoicesPresenter,
} from "@/src/presentation/presenters/invoices";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainInvoices } from "./MainInvoices";
import { RetroInvoices } from "./RetroInvoices";

interface InvoicesViewProps {
  initialViewModel?: InvoicesViewModel;
}

/**
 * InvoicesView - Layout-aware component
 */
export function InvoicesView({ initialViewModel }: InvoicesViewProps) {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [state, actions] = useInvoicesPresenter("user-1", initialViewModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse text-4xl">📄</div>
        </div>
      </div>
    );
  }

  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroInvoices state={state} actions={actions} />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainInvoices state={state} actions={actions} />
    </MainLayout>
  );
}
