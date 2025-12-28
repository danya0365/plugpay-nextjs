"use client";

import { Button } from "@/src/presentation/components/main/Button";
import { Input } from "@/src/presentation/components/main/Input";
import { Modal } from "@/src/presentation/components/main/Modal";
import type {
    PayersPresenterActions,
    PayersPresenterState,
} from "@/src/presentation/presenters/payers/usePayersPresenter";
import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";

interface MainPayersProps {
  state: PayersPresenterState;
  actions: PayersPresenterActions;
}

export function MainPayers({ state, actions }: MainPayersProps) {
  const { viewModel, loading, isCreateModalOpen } = state;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const headerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(
      new Date(dateString)
    );

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.createPayer(formData);
    setFormData({ email: "", name: "", phone: "" });
  };

  if (loading && !viewModel) {
    return (
      <div className="payers-loading">
        <div className="animate-pulse text-6xl mb-4">👥</div>
        <p className="text-gray-500">กำลังโหลดข้อมูลลูกค้า...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="payers-container">
      {/* Header */}
      <animated.div style={headerSpring} className="payers-header">
        <div>
          <h1 className="payers-title">Payers</h1>
          <p className="payers-subtitle">จัดการข้อมูลลูกค้าและผู้ชำระเงิน</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<span>➕</span>}
          onClick={actions.openCreateModal}
        >
          เพิ่มลูกค้า
        </Button>
      </animated.div>

      {/* Stats */}
      <div className="payers-stats">
        <div className="payers-stat">
          <span className="payers-stat-value">{viewModel.stats.total}</span>
          <span className="payers-stat-label">ลูกค้าทั้งหมด</span>
        </div>
      </div>

      {/* Payers Grid */}
      {viewModel.payers.length === 0 ? (
        <div className="payers-empty">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-500 mb-4">ยังไม่มีข้อมูลลูกค้า</p>
          <Button variant="primary" onClick={actions.openCreateModal}>
            เพิ่มลูกค้าคนแรก
          </Button>
        </div>
      ) : (
        <div className="payers-grid">
          {viewModel.payers.map((payer) => (
            <div key={payer.id} className="payer-card">
              <div className="payer-card-avatar">
                👤
              </div>
              <div className="payer-card-info">
                <h3 className="payer-card-name">{payer.name || "No Name"}</h3>
                <p className="payer-card-email">{payer.email}</p>
                {payer.phone && (
                  <p className="payer-card-phone">📞 {payer.phone}</p>
                )}
                <p className="payer-card-date">
                  เพิ่มเมื่อ {formatDate(payer.createdAt)}
                </p>
              </div>
              <button
                onClick={() => actions.openEditModal(payer)}
                className="payer-card-edit"
              >
                ✏️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="เพิ่มลูกค้าใหม่"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={actions.closeCreateModal}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateSubmit}
              loading={loading}
            >
              เพิ่มลูกค้า
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label="ชื่อ"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <Input
            label="เบอร์โทร"
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
