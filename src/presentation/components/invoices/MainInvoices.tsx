"use client";

import { Button } from "@/src/presentation/components/main/Button";
import { Modal } from "@/src/presentation/components/main/Modal";
import type {
    InvoicesPresenterActions,
    InvoicesPresenterState,
} from "@/src/presentation/presenters/invoices/useInvoicesPresenter";
import { animated, config, useSpring } from "@react-spring/web";

interface MainInvoicesProps {
  state: InvoicesPresenterState;
  actions: InvoicesPresenterActions;
}

export function MainInvoices({ state, actions }: MainInvoicesProps) {
  const { viewModel, loading, isDeleteModalOpen, selectedInvoice } = state;

  const headerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(
      new Date(dateString)
    );

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "draft":
        return { icon: "📝", label: "Draft", color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" };
      case "sent":
        return { icon: "📨", label: "Sent", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" };
      case "paid":
        return { icon: "✅", label: "Paid", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" };
      case "expired":
        return { icon: "⏰", label: "Expired", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
      default:
        return { icon: "📄", label: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  const handleDelete = async () => {
    if (selectedInvoice) {
      await actions.deleteInvoice(selectedInvoice.id);
    }
  };

  if (loading && !viewModel) {
    return (
      <div className="invoices-loading">
        <div className="animate-pulse text-6xl mb-4">📄</div>
        <p className="text-gray-500">กำลังโหลดใบแจ้งหนี้...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="invoices-container">
      {/* Header */}
      <animated.div style={headerSpring} className="invoices-header">
        <div>
          <h1 className="invoices-title">Invoices</h1>
          <p className="invoices-subtitle">จัดการใบแจ้งหนี้และใบเสร็จ</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<span>➕</span>}
          onClick={actions.openCreateModal}
        >
          สร้างใบแจ้งหนี้
        </Button>
      </animated.div>

      {/* Stats */}
      <div className="invoices-stats">
        <div className="invoices-stat invoices-stat-primary">
          <span className="invoices-stat-value">{formatCurrency(viewModel.stats.totalAmount)}</span>
          <span className="invoices-stat-label">ยอดรวม</span>
        </div>
        <div className="invoices-stat">
          <span className="invoices-stat-value">{viewModel.stats.total}</span>
          <span className="invoices-stat-label">ทั้งหมด</span>
        </div>
        <div className="invoices-stat">
          <span className="invoices-stat-value">{viewModel.stats.draft}</span>
          <span className="invoices-stat-label">📝 Draft</span>
        </div>
        <div className="invoices-stat">
          <span className="invoices-stat-value">{viewModel.stats.sent}</span>
          <span className="invoices-stat-label">📨 Sent</span>
        </div>
        <div className="invoices-stat">
          <span className="invoices-stat-value">{viewModel.stats.paid}</span>
          <span className="invoices-stat-label">✅ Paid</span>
        </div>
      </div>

      {/* Invoices List */}
      {viewModel.invoices.length === 0 ? (
        <div className="invoices-empty">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-500 mb-4">ยังไม่มีใบแจ้งหนี้</p>
          <Button variant="primary" onClick={actions.openCreateModal}>
            สร้างใบแจ้งหนี้แรก
          </Button>
        </div>
      ) : (
        <div className="invoices-table-wrapper">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>เลขที่</th>
                <th>โปรเจค</th>
                <th>ลูกค้า</th>
                <th>ยอดรวม</th>
                <th>วันครบกำหนด</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {viewModel.invoices.map((invoice) => {
                const project = viewModel.projects.find((p) => p.id === invoice.projectId);
                const payer = viewModel.payers.find((p) => p.id === invoice.payerId);
                const statusInfo = getStatusInfo(invoice.status);

                return (
                  <tr key={invoice.id}>
                    <td className="font-mono font-semibold">{invoice.invoiceNumber}</td>
                    <td>{project?.name || "-"}</td>
                    <td>{payer?.name || payer?.email || "-"}</td>
                    <td className="font-semibold">{formatCurrency(invoice.total)}</td>
                    <td>{formatDate(invoice.dueDate)}</td>
                    <td>
                      <span className={`invoices-status ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {invoice.status === "draft" && (
                          <button
                            onClick={() => actions.updateStatus(invoice.id, "sent")}
                            className="invoices-action-btn"
                            title="Send"
                          >
                            📨
                          </button>
                        )}
                        {invoice.status === "sent" && (
                          <button
                            onClick={() => actions.updateStatus(invoice.id, "paid")}
                            className="invoices-action-btn"
                            title="Mark as Paid"
                          >
                            ✅
                          </button>
                        )}
                        <button
                          onClick={() => actions.openDeleteModal(invoice)}
                          className="invoices-action-btn invoices-action-delete"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={actions.closeDeleteModal}
        title="ยืนยันการลบ"
        size="sm"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={actions.closeDeleteModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={loading}>
              ลบใบแจ้งหนี้
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          คุณแน่ใจหรือไม่ที่จะลบใบแจ้งหนี้{" "}
          <strong className="text-gray-900 dark:text-white">
            {selectedInvoice?.invoiceNumber}
          </strong>?
        </p>
      </Modal>
    </div>
  );
}
