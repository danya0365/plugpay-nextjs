import type { CreatePaymentLinkData, PaymentLink, Project } from "@/src/domain/types";
import {
    paymentLinkRepository,
    projectRepository,
} from "@/src/infrastructure/repositories/mock";

export interface PaymentLinksViewModel {
  paymentLinks: PaymentLink[];
  projects: Project[];
  stats: {
    total: number;
    active: number;
    byType: {
      donate: number;
      fixed: number;
      custom: number;
    };
  };
}

/**
 * PaymentLinks Presenter
 */
export class PaymentLinksPresenter {
  async getViewModel(userId: string): Promise<PaymentLinksViewModel> {
    const projects = await projectRepository.findAll(userId);

    // Get all payment links for all user's projects
    const paymentLinksByProject = await Promise.all(
      projects.map((p) => paymentLinkRepository.findByProjectId(p.id))
    );
    const paymentLinks = paymentLinksByProject.flat();

    const stats = {
      total: paymentLinks.length,
      active: paymentLinks.filter((l) => l.isActive).length,
      byType: {
        donate: paymentLinks.filter((l) => l.type === "donate").length,
        fixed: paymentLinks.filter((l) => l.type === "fixed").length,
        custom: paymentLinks.filter((l) => l.type === "custom").length,
      },
    };

    return { paymentLinks, projects, stats };
  }

  async createPaymentLink(data: CreatePaymentLinkData): Promise<PaymentLink> {
    return paymentLinkRepository.create(data);
  }

  async updatePaymentLink(
    id: string,
    data: Partial<PaymentLink>
  ): Promise<PaymentLink | null> {
    return paymentLinkRepository.update(id, data);
  }

  async deletePaymentLink(id: string): Promise<boolean> {
    return paymentLinkRepository.delete(id);
  }

  generateMetadata() {
    return {
      title: "Payment Links | PlugPay",
      description: "จัดการ Payment Links และ Donate Links ของคุณ",
    };
  }
}

export class PaymentLinksPresenterFactory {
  static createServer(): PaymentLinksPresenter {
    return new PaymentLinksPresenter();
  }

  static createClient(): PaymentLinksPresenter {
    return new PaymentLinksPresenter();
  }
}
