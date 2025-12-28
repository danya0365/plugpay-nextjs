"use client";

import { Button } from "@/src/presentation/components/retro/Button";
import { Modal } from "@/src/presentation/components/retro/Modal";
import type {
    InvoicesPresenterActions,
    InvoicesPresenterState,
} from "@/src/presentation/presenters/invoices/useInvoicesPresenter";

interface RetroInvoicesProps {
  state: InvoicesPresenterState;
  actions: InvoicesPresenterActions;
}

export function RetroInvoices({ state, actions }: RetroInvoicesProps) {
  const { viewModel, loading, isDeleteModalOpen, selectedInvoice } = state;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("th-TH").format(amount) + " ฿";

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", { dateStyle: "short" }).format(
      new Date(dateString)
    );

  const handleDelete = async () => {
    if (selectedInvoice) {
      await actions.deleteInvoice(selectedInvoice.id);
    }
  };

  if (loading && !viewModel) {
    return (
      <div className="retro-invoices-loading">
        <p>⏳ Loading Invoices...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="retro-invoices">
      {/* Banner */}
      <div className="retro-invoices-banner">
        <span>📄</span>
        <h1>Invoice Manager</h1>
        <span>📄</span>
      </div>

      {/* Actions */}
      <div className="retro-invoices-actions">
        <Button onClick={actions.openCreateModal} icon="📄">
          New Invoice
        </Button>
        <Button onClick={actions.loadData} disabled={loading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📊 Statistics</span>
        <div className="retro-invoices-stats">
          <span>💰 Total: {formatCurrency(viewModel.stats.totalAmount)}</span>
          <span>|</span>
          <span>📝 Draft: {viewModel.stats.draft}</span>
          <span>|</span>
          <span>📨 Sent: {viewModel.stats.sent}</span>
          <span>|</span>
          <span>✅ Paid: {viewModel.stats.paid}</span>
        </div>
      </div>

      {/* Table */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📄 Invoice List</span>
        {viewModel.invoices.length === 0 ? (
          <p className="retro-empty">No invoices yet.</p>
        ) : (
          <table className="retro-data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Project</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.invoices.map((invoice) => {
                const project = viewModel.projects.find((p) => p.id === invoice.projectId);
                const payer = viewModel.payers.find((p) => p.id === invoice.payerId);

                return (
                  <tr key={invoice.id}>
                    <td>
                      <strong>{invoice.invoiceNumber}</strong>
                    </td>
                    <td>{project?.name || "-"}</td>
                    <td>{payer?.name || payer?.email || "-"}</td>
                    <td>{formatCurrency(invoice.total)}</td>
                    <td>{formatDate(invoice.dueDate)}</td>
                    <td>
                      {invoice.status === "draft" && (
                        <span className="retro-status">📝 Draft</span>
                      )}
                      {invoice.status === "sent" && (
                        <span className="retro-status retro-status-pending">📨 Sent</span>
                      )}
                      {invoice.status === "paid" && (
                        <span className="retro-status retro-status-paid">✅ Paid</span>
                      )}
                      {invoice.status === "expired" && (
                        <span className="retro-status retro-status-failed">⏰ Expired</span>
                      )}
                    </td>
                    <td>
                      {invoice.status === "draft" && (
                        <button
                          className="retro-btn retro-btn-sm"
                          onClick={() => actions.updateStatus(invoice.id, "sent")}
                        >
                          📨
                        </button>
                      )}{" "}
                      {invoice.status === "sent" && (
                        <button
                          className="retro-btn retro-btn-sm"
                          onClick={() => actions.updateStatus(invoice.id, "paid")}
                        >
                          ✅
                        </button>
                      )}{" "}
                      <button
                        className="retro-btn retro-btn-sm"
                        onClick={() => actions.openDeleteModal(invoice)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={actions.closeDeleteModal}
        title="Confirm Delete"
        icon="⚠️"
        footer={
          <div className="flex gap-2 justify-end">
            <Button onClick={actions.closeDeleteModal}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        }
      >
        <p>⚠️ Delete invoice "{selectedInvoice?.invoiceNumber}"?</p>
      </Modal>
    </div>
  );
}
