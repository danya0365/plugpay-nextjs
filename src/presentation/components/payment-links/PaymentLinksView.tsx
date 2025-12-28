"use client";

import { MainLayout } from "@/src/presentation/layouts/MainLayout";
import { RetroLayout } from "@/src/presentation/layouts/RetroLayout";
import {
    PaymentLinksViewModel,
    usePaymentLinksPresenter,
} from "@/src/presentation/presenters/payment-links";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useEffect, useState } from "react";
import { MainPaymentLinks } from "./MainPaymentLinks";
import { RetroPaymentLinks } from "./RetroPaymentLinks";

interface PaymentLinksViewProps {
  initialViewModel?: PaymentLinksViewModel;
}

/**
 * PaymentLinksView - Layout-aware component
 */
export function PaymentLinksView({ initialViewModel }: PaymentLinksViewProps) {
  const { layout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [state, actions] = usePaymentLinksPresenter("user-1", initialViewModel);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="main-layout">
        <div className="main-content flex items-center justify-center">
          <div className="animate-pulse text-4xl">🔗</div>
        </div>
      </div>
    );
  }

  if (layout === "retro") {
    return (
      <RetroLayout>
        <RetroPaymentLinks state={state} actions={actions} />
      </RetroLayout>
    );
  }

  return (
    <MainLayout>
      <MainPaymentLinks state={state} actions={actions} />
    </MainLayout>
  );
}
