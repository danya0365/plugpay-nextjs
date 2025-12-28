import { mockPaymentLinks } from "@/src/data/mock";
import type { CreatePaymentLinkData, PaymentLink } from "@/src/domain/types";

/**
 * Mock PaymentLink Repository
 */
export class MockPaymentLinkRepository {
  private paymentLinks: PaymentLink[] = [...mockPaymentLinks];

  async findByProjectId(projectId: string): Promise<PaymentLink[]> {
    return this.paymentLinks.filter((l) => l.projectId === projectId);
  }

  async findById(id: string): Promise<PaymentLink | null> {
    return this.paymentLinks.find((l) => l.id === id) || null;
  }

  async findBySlug(slug: string): Promise<PaymentLink | null> {
    return this.paymentLinks.find((l) => l.slug === slug) || null;
  }

  async create(data: CreatePaymentLinkData): Promise<PaymentLink> {
    const now = new Date().toISOString();
    const newLink: PaymentLink = {
      id: `link-${Date.now()}`,
      projectId: data.projectId,
      type: data.type,
      title: data.title,
      description: data.description,
      amount: data.amount,
      currency: data.currency || "THB",
      isActive: true,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      createdAt: now,
      updatedAt: now,
    };
    this.paymentLinks.push(newLink);
    return newLink;
  }

  async update(
    id: string,
    data: Partial<PaymentLink>
  ): Promise<PaymentLink | null> {
    const index = this.paymentLinks.findIndex((l) => l.id === id);
    if (index === -1) return null;

    this.paymentLinks[index] = {
      ...this.paymentLinks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.paymentLinks[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.paymentLinks.findIndex((l) => l.id === id);
    if (index === -1) return false;

    this.paymentLinks.splice(index, 1);
    return true;
  }
}

export const paymentLinkRepository = new MockPaymentLinkRepository();
