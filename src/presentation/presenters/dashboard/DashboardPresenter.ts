import type { DashboardStats, Payment, Project } from "@/src/domain/types";
import {
    paymentRepository,
    projectRepository,
} from "@/src/infrastructure/repositories/mock";

export interface DashboardViewModel {
  stats: DashboardStats;
  recentPayments: Payment[];
  projects: Project[];
}

/**
 * Dashboard Presenter
 * Aggregates data for dashboard overview
 */
export class DashboardPresenter {
  async getViewModel(userId: string): Promise<DashboardViewModel> {
    // Get user's projects
    const projects = await projectRepository.findAll(userId);

    // Get recent payments across all projects
    const recentPayments = await paymentRepository.getRecentPayments(5);

    // Calculate stats
    const totalRevenue = await paymentRepository.getTotalRevenue();
    const projectStats = await Promise.all(
      projects.map(async (project) => ({
        projectId: project.id,
        projectName: project.name,
        revenue: await paymentRepository.getTotalRevenue(project.id),
      }))
    );

    // Revenue by provider
    const paidPayments = recentPayments.filter((p) => p.status === "paid");
    const stripeRevenue = paidPayments
      .filter((p) => p.provider === "stripe")
      .reduce((sum, p) => sum + p.amount, 0);
    const omiseRevenue = paidPayments
      .filter((p) => p.provider === "omise")
      .reduce((sum, p) => sum + p.amount, 0);

    const stats: DashboardStats = {
      totalProjects: projects.length,
      totalRevenue,
      totalPayments: recentPayments.length,
      revenueByProject: projectStats,
      revenueByProvider: [
        { provider: "stripe", revenue: stripeRevenue },
        { provider: "omise", revenue: omiseRevenue },
      ],
      recentPayments,
    };

    return {
      stats,
      recentPayments,
      projects,
    };
  }

  generateMetadata() {
    return {
      title: "Dashboard | PlugPay",
      description: "ภาพรวมรายได้และสถิติการชำระเงินทั้งหมด",
    };
  }
}

export class DashboardPresenterFactory {
  static createServer(): DashboardPresenter {
    return new DashboardPresenter();
  }

  static createClient(): DashboardPresenter {
    return new DashboardPresenter();
  }
}
