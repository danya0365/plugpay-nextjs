import { InvoicesView } from "@/src/presentation/components/invoices";
import { InvoicesPresenterFactory } from "@/src/presentation/presenters/invoices";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Invoices | PlugPay",
  description: "จัดการใบแจ้งหนี้และใบเสร็จ",
};

/**
 * Invoices Page
 */
export default async function InvoicesPage() {
  const presenter = InvoicesPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel("user-1");
    return <InvoicesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return <InvoicesView />;
  }
}
