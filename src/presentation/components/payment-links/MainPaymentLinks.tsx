"use client";

import type { PaymentLinkType } from "@/src/domain/types";
import { Button } from "@/src/presentation/components/main/Button";
import { Input } from "@/src/presentation/components/main/Input";
import { Modal } from "@/src/presentation/components/main/Modal";
import { Select } from "@/src/presentation/components/main/Select";
import type {
    PaymentLinksPresenterActions,
    PaymentLinksPresenterState,
} from "@/src/presentation/presenters/payment-links/usePaymentLinksPresenter";
import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";

interface MainPaymentLinksProps {
  state: PaymentLinksPresenterState;
  actions: PaymentLinksPresenterActions;
}

export function MainPaymentLinks({ state, actions }: MainPaymentLinksProps) {
  const { viewModel, loading, isCreateModalOpen, isDeleteModalOpen, selectedLink } =
    state;

  const [formData, setFormData] = useState({
    projectId: "",
    type: "donate" as PaymentLinkType,
    title: "",
    description: "",
    amount: "",
    currency: "THB",
  });

  const headerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
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

  const getTypeIcon = (type: PaymentLinkType) => {
    switch (type) {
      case "donate":
        return "❤️";
      case "fixed":
        return "💵";
      case "custom":
        return "✏️";
      default:
        return "🔗";
    }
  };

  const formatCurrency = (amount: number | undefined, currency: string) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency,
    }).format(amount);
  };

  if (loading && !viewModel) {
    return (
      <div className="payment-links-loading">
        <div className="animate-pulse text-6xl mb-4">🔗</div>
        <p className="text-gray-500">กำลังโหลด Payment Links...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="payment-links-container">
      {/* Header */}
      <animated.div style={headerSpring} className="payment-links-header">
        <div>
          <h1 className="payment-links-title">Payment Links</h1>
          <p className="payment-links-subtitle">จัดการลิงก์รับชำระเงิน</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<span>➕</span>}
          onClick={actions.openCreateModal}
        >
          สร้าง Payment Link
        </Button>
      </animated.div>

      {/* Stats */}
      <div className="payment-links-stats">
        <div className="payment-links-stat">
          <span className="payment-links-stat-value">{viewModel.stats.total}</span>
          <span className="payment-links-stat-label">ทั้งหมด</span>
        </div>
        <div className="payment-links-stat">
          <span className="payment-links-stat-value">{viewModel.stats.byType.donate}</span>
          <span className="payment-links-stat-label">❤️ Donate</span>
        </div>
        <div className="payment-links-stat">
          <span className="payment-links-stat-value">{viewModel.stats.byType.fixed}</span>
          <span className="payment-links-stat-label">💵 Fixed</span>
        </div>
        <div className="payment-links-stat">
          <span className="payment-links-stat-value">{viewModel.stats.byType.custom}</span>
          <span className="payment-links-stat-label">✏️ Custom</span>
        </div>
      </div>

      {/* Links Grid */}
      {viewModel.paymentLinks.length === 0 ? (
        <div className="payment-links-empty">
          <div className="text-6xl mb-4">🔗</div>
          <p className="text-gray-500 mb-4">ยังไม่มี Payment Links</p>
          <Button variant="primary" onClick={actions.openCreateModal}>
            สร้าง Payment Link แรก
          </Button>
        </div>
      ) : (
        <div className="payment-links-grid">
          {viewModel.paymentLinks.map((link) => {
            const project = viewModel.projects.find((p) => p.id === link.projectId);
            return (
              <div key={link.id} className="payment-link-card">
                <div className="payment-link-card-header">
                  <div className="payment-link-type-badge">
                    {getTypeIcon(link.type)} {link.type}
                  </div>
                  <span
                    className={`payment-link-status ${
                      link.isActive ? "payment-link-active" : "payment-link-inactive"
                    }`}
                  >
                    {link.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className="payment-link-title">{link.title}</h3>
                {link.description && (
                  <p className="payment-link-desc">{link.description}</p>
                )}

                <div className="payment-link-meta">
                  <span className="payment-link-project">📁 {project?.name || "Unknown"}</span>
                  <span className="payment-link-amount">
                    {formatCurrency(link.amount, link.currency)}
                  </span>
                </div>

                <div className="payment-link-actions">
                  <a
                    href={`/pay/${link.slug}`}
                    target="_blank"
                    className="payment-link-url"
                  >
                    🔗 /pay/{link.slug}
                  </a>
                  <button
                    onClick={() => actions.openDeleteModal(link)}
                    className="payment-link-delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="สร้าง Payment Link ใหม่"
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
              สร้าง
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Select
            label="โปรเจค"
            options={viewModel.projects.map((p) => ({
              value: p.id,
              label: p.name,
            }))}
            value={formData.projectId}
            onChange={(e) =>
              setFormData({ ...formData, projectId: e.target.value })
            }
            placeholder="เลือกโปรเจค"
            required
          />
          <Select
            label="ประเภท"
            options={[
              { value: "donate", label: "❤️ Donate (ยอดผู้บริจาคกำหนดเอง)" },
              { value: "fixed", label: "💵 Fixed (ยอดคงที่)" },
              { value: "custom", label: "✏️ Custom (ผู้ซื้อกำหนดเอง)" },
            ]}
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as PaymentLinkType })
            }
          />
          <Input
            label="ชื่อ Payment Link"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Input
            label="คำอธิบาย"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {formData.type === "fixed" && (
            <Input
              label="จำนวนเงิน (THB)"
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
        title="ยืนยันการลบ"
        size="sm"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={actions.closeDeleteModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={loading}>
              ลบ
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          คุณแน่ใจหรือไม่ที่จะลบ Payment Link{" "}
          <strong className="text-gray-900 dark:text-white">
            {selectedLink?.title}
          </strong>?
        </p>
      </Modal>
    </div>
  );
}
