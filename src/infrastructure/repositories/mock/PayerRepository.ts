import { mockPayers } from "@/src/data/mock";
import type { CreatePayerData, Payer } from "@/src/domain/types";

/**
 * Mock Payer Repository
 */
export class MockPayerRepository {
  private payers: Payer[] = [...mockPayers];

  async findAll(): Promise<Payer[]> {
    return this.payers;
  }

  async findById(id: string): Promise<Payer | null> {
    return this.payers.find((p) => p.id === id) || null;
  }

  async findByEmail(email: string): Promise<Payer | null> {
    return this.payers.find((p) => p.email === email) || null;
  }

  async create(data: CreatePayerData): Promise<Payer> {
    const now = new Date().toISOString();
    const newPayer: Payer = {
      id: `payer-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone,
      createdAt: now,
      updatedAt: now,
    };
    this.payers.push(newPayer);
    return newPayer;
  }

  async update(id: string, data: Partial<Payer>): Promise<Payer | null> {
    const index = this.payers.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.payers[index] = {
      ...this.payers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.payers[index];
  }

  async findOrCreate(data: CreatePayerData): Promise<Payer> {
    const existing = await this.findByEmail(data.email);
    if (existing) return existing;
    return this.create(data);
  }
}

export const payerRepository = new MockPayerRepository();
