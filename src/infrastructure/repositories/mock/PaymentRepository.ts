import { mockPayments } from "@/src/data/mock";
import type { Payment, PaymentStatus } from "@/src/domain/types";

/**
 * Mock Payment Repository
 */
export class MockPaymentRepository {
  private payments: Payment[] = [...mockPayments];

  async findByProjectId(projectId: string): Promise<Payment[]> {
    return this.payments.filter((p) => p.projectId === projectId);
  }

  async findByPaymentLinkId(paymentLinkId: string): Promise<Payment[]> {
    return this.payments.filter((p) => p.paymentLinkId === paymentLinkId);
  }

  async findById(id: string): Promise<Payment | null> {
    return this.payments.find((p) => p.id === id) || null;
  }

  async findByProviderPaymentId(
    providerPaymentId: string
  ): Promise<Payment | null> {
    return (
      this.payments.find((p) => p.providerPaymentId === providerPaymentId) ||
      null
    );
  }

  async create(data: Omit<Payment, "id" | "createdAt" | "updatedAt">): Promise<Payment> {
    const now = new Date().toISOString();
    const newPayment: Payment = {
      ...data,
      id: `pay-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<Payment | null> {
    const index = this.payments.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    this.payments[index] = {
      ...this.payments[index],
      status,
      paidAt: status === "paid" ? now : this.payments[index].paidAt,
      updatedAt: now,
    };
    return this.payments[index];
  }

  async getRecentPayments(limit: number = 10): Promise<Payment[]> {
    return [...this.payments]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  }

  async getTotalRevenue(projectId?: string): Promise<number> {
    const payments = projectId
      ? this.payments.filter(
          (p) => p.projectId === projectId && p.status === "paid"
        )
      : this.payments.filter((p) => p.status === "paid");

    return payments.reduce((sum, p) => sum + p.amount, 0);
  }
}

export const paymentRepository = new MockPaymentRepository();
