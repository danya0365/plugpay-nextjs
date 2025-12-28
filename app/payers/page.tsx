import { PayersView } from "@/src/presentation/components/payers";
import { PayersPresenterFactory } from "@/src/presentation/presenters/payers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Payers | PlugPay",
  description: "จัดการข้อมูลลูกค้าและผู้ชำระเงิน",
};

/**
 * Payers Page
 */
export default async function PayersPage() {
  const presenter = PayersPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <PayersView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching payers:", error);
    return <PayersView />;
  }
}
