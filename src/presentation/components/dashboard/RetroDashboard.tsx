"use client";

import type {
    DashboardPresenterActions,
    DashboardPresenterState,
} from "@/src/presentation/presenters/dashboard/useDashboardPresenter";

interface RetroDashboardProps {
  state: DashboardPresenterState;
  actions: DashboardPresenterActions;
}

/**
 * Windows 98 style Dashboard component
 */
export function RetroDashboard({ state, actions }: RetroDashboardProps) {
  const { viewModel, loading, error } = state;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("th-TH").format(amount) + " ฿";

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(dateString));

  if (loading && !viewModel) {
    return (
      <div className="retro-dashboard-loading">
        <p>⏳ Loading Dashboard...</p>
      </div>
    );
  }

  if (error && !viewModel) {
    return (
      <div className="retro-dashboard-error">
        <p>❌ Error: {error}</p>
        <button onClick={actions.loadData} className="retro-btn">
          🔄 Retry
        </button>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="retro-dashboard">
      {/* Title Banner */}
      <div className="retro-dashboard-banner">
        <span>📊</span>
        <h1>Dashboard - PlugPay Control Panel</h1>
        <span>📊</span>
      </div>

      {/* Refresh Button */}
      <div className="retro-dashboard-actions">
        <button onClick={actions.loadData} className="retro-btn" disabled={loading}>
          🔄 Refresh
        </button>
      </div>

      {/* Stats Table */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📈 Statistics</span>
        <table className="retro-stats-table">
          <tbody>
            <tr>
              <td className="retro-stats-icon">💰</td>
              <td className="retro-stats-label">Total Revenue:</td>
              <td className="retro-stats-value">
                {formatCurrency(viewModel.stats.totalRevenue)}
              </td>
            </tr>
            <tr>
              <td className="retro-stats-icon">📦</td>
              <td className="retro-stats-label">Projects:</td>
              <td className="retro-stats-value">
                {viewModel.stats.totalProjects}
              </td>
            </tr>
            <tr>
              <td className="retro-stats-icon">💳</td>
              <td className="retro-stats-label">Payments:</td>
              <td className="retro-stats-value">
                {viewModel.stats.totalPayments}
              </td>
            </tr>
            <tr>
              <td className="retro-stats-icon">💳</td>
              <td className="retro-stats-label">Stripe Revenue:</td>
              <td className="retro-stats-value">
                {formatCurrency(
                  viewModel.stats.revenueByProvider.find(
                    (p) => p.provider === "stripe"
                  )?.revenue || 0
                )}
              </td>
            </tr>
            <tr>
              <td className="retro-stats-icon">📱</td>
              <td className="retro-stats-label">Omise Revenue:</td>
              <td className="retro-stats-value">
                {formatCurrency(
                  viewModel.stats.revenueByProvider.find(
                    (p) => p.provider === "omise"
                  )?.revenue || 0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Two Column Layout */}
      <div className="retro-dashboard-columns">
        {/* Recent Payments */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">💳 Recent Payments</span>
          {viewModel.recentPayments.length === 0 ? (
            <p className="retro-empty">No payments yet.</p>
          ) : (
            <table className="retro-data-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {viewModel.recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      <span className={`retro-status retro-status-${payment.status}`}>
                        {payment.status === "paid" && "✅"}
                        {payment.status === "pending" && "⏳"}
                        {payment.status === "failed" && "❌"}
                        {payment.status === "refunded" && "↩️"}
                        {" "}{payment.status}
                      </span>
                    </td>
                    <td>{formatDate(payment.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="retro-table-footer">
            <a href="/payments" className="retro-link">
              [View All Payments]
            </a>
          </div>
        </div>

        {/* Projects */}
        <div className="retro-groupbox">
          <span className="retro-groupbox-title">📁 Your Projects</span>
          {viewModel.projects.length === 0 ? (
            <p className="retro-empty">No projects yet.</p>
          ) : (
            <table className="retro-data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {viewModel.projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <a href={`/projects/${project.slug}`} className="retro-link">
                        📁 {project.name}
                      </a>
                    </td>
                    <td>/{project.slug}</td>
                    <td>
                      {project.isActive ? (
                        <span className="retro-status retro-status-paid">
                          ✅ Active
                        </span>
                      ) : (
                        <span className="retro-status retro-status-failed">
                          ❌ Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="retro-table-footer">
            <a href="/projects" className="retro-link">
              [View All Projects]
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="retro-dashboard-footer">
        <hr />
        <p>Last updated: {new Date().toLocaleString("th-TH")}</p>
      </div>
    </div>
  );
}
