"use client";

import { Button } from "@/src/presentation/components/retro/Button";
import { Input } from "@/src/presentation/components/retro/Input";
import { Modal } from "@/src/presentation/components/retro/Modal";
import type {
    PayersPresenterActions,
    PayersPresenterState,
} from "@/src/presentation/presenters/payers/usePayersPresenter";
import { useState } from "react";

interface RetroPayersProps {
  state: PayersPresenterState;
  actions: PayersPresenterActions;
}

export function RetroPayers({ state, actions }: RetroPayersProps) {
  const { viewModel, loading, isCreateModalOpen } = state;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", { dateStyle: "short" }).format(
      new Date(dateString)
    );

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.createPayer(formData);
    setFormData({ email: "", name: "", phone: "" });
  };

  if (loading && !viewModel) {
    return (
      <div className="retro-payers-loading">
        <p>⏳ Loading Payers...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="retro-payers">
      {/* Banner */}
      <div className="retro-payers-banner">
        <span>👥</span>
        <h1>Customer Manager</h1>
        <span>👥</span>
      </div>

      {/* Actions */}
      <div className="retro-payers-actions">
        <Button onClick={actions.openCreateModal} icon="👤">
          New Customer
        </Button>
        <Button onClick={actions.loadData} disabled={loading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📊 Statistics</span>
        <div className="retro-payers-stats">
          <span>👥 Total Customers: {viewModel.stats.total}</span>
        </div>
      </div>

      {/* Table */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">👥 Customer List</span>
        {viewModel.payers.length === 0 ? (
          <p className="retro-empty">No customers yet.</p>
        ) : (
          <table className="retro-data-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.payers.map((payer) => (
                <tr key={payer.id}>
                  <td>👤</td>
                  <td>{payer.name || "-"}</td>
                  <td>
                    <a href={`mailto:${payer.email}`} className="retro-link">
                      {payer.email}
                    </a>
                  </td>
                  <td>{payer.phone || "-"}</td>
                  <td>{formatDate(payer.createdAt)}</td>
                  <td>
                    <button
                      className="retro-btn retro-btn-sm"
                      onClick={() => actions.openEditModal(payer)}
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="New Customer"
        icon="👤"
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
          <Input
            label="Email:"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label="Name:"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <Input
            label="Phone:"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </form>
      </Modal>
    </div>
  );
}
