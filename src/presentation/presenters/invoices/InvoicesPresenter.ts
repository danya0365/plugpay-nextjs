import type { CreateInvoiceData, Invoice, Payer, Project } from "@/src/domain/types";
import {
    invoiceRepository,
    payerRepository,
    projectRepository,
} from "@/src/infrastructure/repositories/mock";

export interface InvoicesViewModel {
  invoices: Invoice[];
  payers: Payer[];
  projects: Project[];
  stats: {
    total: number;
    draft: number;
    sent: number;
    paid: number;
    totalAmount: number;
  };
}

/**
 * Invoices Presenter
 */
export class InvoicesPresenter {
  async getViewModel(userId: string): Promise<InvoicesViewModel> {
    const projects = await projectRepository.findAll(userId);

    // Get all invoices for user's projects
    const invoicesByProject = await Promise.all(
      projects.map((p) => invoiceRepository.findByProjectId(p.id))
    );
    const invoices = invoicesByProject.flat();

    // Get all payers
    const payers = await payerRepository.findAll();

    const stats = {
      total: invoices.length,
      draft: invoices.filter((i) => i.status === "draft").length,
      sent: invoices.filter((i) => i.status === "sent").length,
      paid: invoices.filter((i) => i.status === "paid").length,
      totalAmount: invoices.reduce((sum, i) => sum + i.total, 0),
    };

    return { invoices, payers, projects, stats };
  }

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    return invoiceRepository.create(data);
  }

  async updateStatus(id: string, status: Invoice["status"]): Promise<Invoice | null> {
    return invoiceRepository.updateStatus(id, status);
  }

  async deleteInvoice(id: string): Promise<boolean> {
    return invoiceRepository.delete(id);
  }

  generateMetadata() {
    return {
      title: "Invoices | PlugPay",
      description: "จัดการใบแจ้งหนี้และใบเสร็จ",
    };
  }
}

export class InvoicesPresenterFactory {
  static createServer(): InvoicesPresenter {
    return new InvoicesPresenter();
  }

  static createClient(): InvoicesPresenter {
    return new InvoicesPresenter();
  }
}
