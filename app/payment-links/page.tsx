import { PaymentLinksView } from "@/src/presentation/components/payment-links";
import { PaymentLinksPresenterFactory } from "@/src/presentation/presenters/payment-links";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Payment Links | PlugPay",
  description: "จัดการ Payment Links และ Donate Links ของคุณ",
};

/**
 * Payment Links Page
 */
export default async function PaymentLinksPage() {
  const presenter = PaymentLinksPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel("user-1");
    return <PaymentLinksView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching payment links:", error);
    return <PaymentLinksView />;
  }
}
