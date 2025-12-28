import type { CreatePayerData, Payer } from "@/src/domain/types";
import { payerRepository } from "@/src/infrastructure/repositories/mock";

export interface PayersViewModel {
  payers: Payer[];
  stats: {
    total: number;
  };
}

/**
 * Payers Presenter
 */
export class PayersPresenter {
  async getViewModel(): Promise<PayersViewModel> {
    const payers = await payerRepository.findAll();

    return {
      payers,
      stats: {
        total: payers.length,
      },
    };
  }

  async createPayer(data: CreatePayerData): Promise<Payer> {
    return payerRepository.create(data);
  }

  async updatePayer(id: string, data: Partial<Payer>): Promise<Payer | null> {
    return payerRepository.update(id, data);
  }

  generateMetadata() {
    return {
      title: "Payers | PlugPay",
      description: "จัดการข้อมูลลูกค้าและผู้ชำระเงิน",
    };
  }
}

export class PayersPresenterFactory {
  static createServer(): PayersPresenter {
    return new PayersPresenter();
  }

  static createClient(): PayersPresenter {
    return new PayersPresenter();
  }
}
