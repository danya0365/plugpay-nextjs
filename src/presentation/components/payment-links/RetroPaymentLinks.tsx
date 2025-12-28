"use client";

import type { PaymentLinkType } from "@/src/domain/types";
import { Button } from "@/src/presentation/components/retro/Button";
import { Input } from "@/src/presentation/components/retro/Input";
import { Modal } from "@/src/presentation/components/retro/Modal";
import { Select } from "@/src/presentation/components/retro/Select";
import type {
    PaymentLinksPresenterActions,
    PaymentLinksPresenterState,
} from "@/src/presentation/presenters/payment-links/usePaymentLinksPresenter";
import { useState } from "react";

interface RetroPaymentLinksProps {
  state: PaymentLinksPresenterState;
  actions: PaymentLinksPresenterActions;
}

export function RetroPaymentLinks({ state, actions }: RetroPaymentLinksProps) {
  const {
    viewModel,
    loading,
    isCreateModalOpen,
    isDeleteModalOpen,
    selectedLink,
  } = state;

  const [formData, setFormData] = useState({
    projectId: "",
    type: "donate" as PaymentLinkType,
    title: "",
    description: "",
    amount: "",
    currency: "THB",
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.createPaymentLink({
      ...formData,
      amount: formData.type === "fixed" ? Number(formData.amount) : undefined,
    });
    setFormData({
      projectId: "",
      type: "donate",
      title: "",
      description: "",
      amount: "",
      currency: "THB",
    });
  };

  const handleDelete = async () => {
    if (selectedLink) {
      await actions.deletePaymentLink(selectedLink.id);
    }
  };

  if (loading && !viewModel) {
    return (
      <div className="retro-payment-links-loading">
        <p>⏳ Loading Payment Links...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="retro-payment-links">
      {/* Banner */}
      <div className="retro-payment-links-banner">
        <span>🔗</span>
        <h1>Payment Links Manager</h1>
        <span>🔗</span>
      </div>

      {/* Actions */}
      <div className="retro-payment-links-actions">
        <Button onClick={actions.openCreateModal} icon="🔗">
          New Link
        </Button>
        <Button onClick={actions.loadData} disabled={loading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📊 Statistics</span>
        <div className="retro-payment-links-stats">
          <span>Total: {viewModel.stats.total}</span>
          <span>|</span>
          <span>❤️ Donate: {viewModel.stats.byType.donate}</span>
          <span>|</span>
          <span>💵 Fixed: {viewModel.stats.byType.fixed}</span>
          <span>|</span>
          <span>✏️ Custom: {viewModel.stats.byType.custom}</span>
        </div>
      </div>

      {/* Table */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">🔗 Payment Links</span>
        {viewModel.paymentLinks.length === 0 ? (
          <p className="retro-empty">No payment links yet.</p>
        ) : (
          <table className="retro-data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.paymentLinks.map((link) => {
                const project = viewModel.projects.find(
                  (p) => p.id === link.projectId
                );
                return (
                  <tr key={link.id}>
                    <td>
                      {link.type === "donate" && "❤️"}
                      {link.type === "fixed" && "💵"}
                      {link.type === "custom" && "✏️"}
                      {" "}{link.type}
                    </td>
                    <td>
                      <a href={`/pay/${link.slug}`} className="retro-link">
                        {link.title}
                      </a>
                    </td>
                    <td>{project?.name || "-"}</td>
                    <td>{link.amount ? `${link.amount} ${link.currency}` : "-"}</td>
                    <td>
                      {link.isActive ? (
                        <span className="retro-status retro-status-paid">✅ Active</span>
                      ) : (
                        <span className="retro-status retro-status-failed">❌ Inactive</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="retro-btn retro-btn-sm"
                        onClick={() => actions.openDeleteModal(link)}
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

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="New Payment Link"
        icon="🔗"
        footer={
          <div className="flex gap-2 justify-end">
            <Button onClick={actions.closeCreateModal}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateSubmit}>
              Create
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="retro-form">
          <Select
            label="Project:"
            options={viewModel.projects.map((p) => ({
              value: p.id,
              label: p.name,
            }))}
            value={formData.projectId}
            onChange={(e) =>
              setFormData({ ...formData, projectId: e.target.value })
            }
            placeholder="Select project..."
          />
          <Select
            label="Type:"
            options={[
              { value: "donate", label: "❤️ Donate" },
              { value: "fixed", label: "💵 Fixed" },
              { value: "custom", label: "✏️ Custom" },
            ]}
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as PaymentLinkType })
            }
          />
          <Input
            label="Title:"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Input
            label="Description:"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {formData.type === "fixed" && (
            <Input
              label="Amount (THB):"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          )}
        </form>
      </Modal>

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
        <p>⚠️ Delete payment link "{selectedLink?.title}"?</p>
      </Modal>
    </div>
  );
}
