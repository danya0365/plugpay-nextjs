import { DashboardView } from "@/src/presentation/components/dashboard";
import { DashboardPresenterFactory } from "@/src/presentation/presenters/dashboard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Dashboard | PlugPay",
  description: "ภาพรวมรายได้และสถิติการชำระเงินทั้งหมด",
};

/**
 * Dashboard Page - Server Component for SEO
 */
export default async function DashboardPage() {
  const presenter = DashboardPresenterFactory.createServer();

  try {
    // Mock user ID for now
    const viewModel = await presenter.getViewModel("user-1");
    return <DashboardView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return <DashboardView />;
  }
}
