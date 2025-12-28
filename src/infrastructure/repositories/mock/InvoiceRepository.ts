import { mockInvoices } from "@/src/data/mock";
import type { CreateInvoiceData, Invoice, InvoiceStatus } from "@/src/domain/types";

/**
 * Mock Invoice Repository
 */
export class MockInvoiceRepository {
  private invoices: Invoice[] = [...mockInvoices];
  private invoiceCounter = 4;

  async findByProjectId(projectId: string): Promise<Invoice[]> {
    return this.invoices.filter((i) => i.projectId === projectId);
  }

  async findByPayerId(payerId: string): Promise<Invoice[]> {
    return this.invoices.filter((i) => i.payerId === payerId);
  }

  async findById(id: string): Promise<Invoice | null> {
    return this.invoices.find((i) => i.id === id) || null;
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    return this.invoices.find((i) => i.invoiceNumber === invoiceNumber) || null;
  }

  async create(data: CreateInvoiceData): Promise<Invoice> {
    const now = new Date().toISOString();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(this.invoiceCounter++).padStart(3, "0")}`;
    
    const items = data.items.map((item, index) => ({
      id: `item-${Date.now()}-${index}`,
      invoiceId: `inv-${Date.now()}`,
      ...item,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = data.tax ?? subtotal * 0.07; // 7% VAT default
    const total = subtotal + tax;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      projectId: data.projectId,
      payerId: data.payerId,
      invoiceNumber,
      status: "draft",
      items,
      subtotal,
      tax,
      total,
      currency: data.currency || "THB",
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    this.invoices.push(newInvoice);
    return newInvoice;
  }

  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice | null> {
    const index = this.invoices.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString();
    this.invoices[index] = {
      ...this.invoices[index],
      status,
      paidAt: status === "paid" ? now : this.invoices[index].paidAt,
      updatedAt: now,
    };
    return this.invoices[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.invoices.findIndex((i) => i.id === id);
    if (index === -1) return false;

    this.invoices.splice(index, 1);
    return true;
  }
}

export const invoiceRepository = new MockInvoiceRepository();
