"use client";

import type {
    DashboardPresenterActions,
    DashboardPresenterState,
} from "@/src/presentation/presenters/dashboard/useDashboardPresenter";
import { animated, config, useSpring } from "@react-spring/web";

interface MainDashboardProps {
  state: DashboardPresenterState;
  actions: DashboardPresenterActions;
}

/**
 * Modern Dashboard component
 */
export function MainDashboard({ state, actions }: MainDashboardProps) {
  const { viewModel, loading, error } = state;

  // Animation for stats cards
  const statsSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  if (loading && !viewModel) {
    return (
      <div className="dashboard-loading">
        <div className="animate-pulse text-6xl mb-4">📊</div>
        <p className="text-gray-500">กำลังโหลดข้อมูล Dashboard...</p>
      </div>
    );
  }

  if (error && !viewModel) {
    return (
      <div className="dashboard-error">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={actions.loadData} className="main-btn main-btn-primary">
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  if (!viewModel) return null;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">ภาพรวมรายได้และสถิติการชำระเงิน</p>
        </div>
        <button
          onClick={actions.loadData}
          className="main-btn main-btn-secondary"
          disabled={loading}
        >
          🔄 รีเฟรช
        </button>
      </div>

      {/* Stats Cards */}
      <animated.div style={statsSpring} className="dashboard-stats-grid">
        <div className="dashboard-stat-card dashboard-stat-primary">
          <div className="dashboard-stat-icon">💰</div>
          <div className="dashboard-stat-content">
            <p className="dashboard-stat-label">รายได้รวม</p>
            <p className="dashboard-stat-value">
              {formatCurrency(viewModel.stats.totalRevenue)}
            </p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">📦</div>
          <div className="dashboard-stat-content">
            <p className="dashboard-stat-label">โปรเจค</p>
            <p className="dashboard-stat-value">{viewModel.stats.totalProjects}</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">💳</div>
          <div className="dashboard-stat-content">
            <p className="dashboard-stat-label">การชำระเงิน</p>
            <p className="dashboard-stat-value">{viewModel.stats.totalPayments}</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">📊</div>
          <div className="dashboard-stat-content">
            <p className="dashboard-stat-label">Stripe</p>
            <p className="dashboard-stat-value">
              {formatCurrency(
                viewModel.stats.revenueByProvider.find(
                  (p) => p.provider === "stripe"
                )?.revenue || 0
              )}
            </p>
          </div>
        </div>
      </animated.div>

      {/* Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Payments */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">การชำระเงินล่าสุด</h2>
            <a href="/payments" className="dashboard-card-link">
              ดูทั้งหมด →
            </a>
          </div>
          <div className="dashboard-card-body">
            {viewModel.recentPayments.length === 0 ? (
              <p className="dashboard-empty">ยังไม่มีการชำระเงิน</p>
            ) : (
              <div className="dashboard-payment-list">
                {viewModel.recentPayments.map((payment) => (
                  <div key={payment.id} className="dashboard-payment-item">
                    <div className="dashboard-payment-info">
                      <p className="dashboard-payment-amount">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="dashboard-payment-date">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                    <span className={`dashboard-payment-status ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">โปรเจคของคุณ</h2>
            <a href="/projects" className="dashboard-card-link">
              ดูทั้งหมด →
            </a>
          </div>
          <div className="dashboard-card-body">
            {viewModel.projects.length === 0 ? (
              <p className="dashboard-empty">ยังไม่มีโปรเจค</p>
            ) : (
              <div className="dashboard-project-list">
                {viewModel.projects.map((project) => (
                  <div key={project.id} className="dashboard-project-item">
                    <div className="dashboard-project-info">
                      <p className="dashboard-project-name">{project.name}</p>
                      <p className="dashboard-project-slug">/{project.slug}</p>
                    </div>
                    <span
                      className={`dashboard-project-status ${
                        project.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {project.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
