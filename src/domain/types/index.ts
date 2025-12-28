/**
 * User Domain Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Project Domain Types
 */
export interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  donateEnabled: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  donateEnabled?: boolean;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  donateEnabled?: boolean;
  isActive?: boolean;
}

/**
 * Payment Link Types
 */
export type PaymentLinkType = "donate" | "fixed" | "custom";

export interface PaymentLink {
  id: string;
  projectId: string;
  type: PaymentLinkType;
  title: string;
  description?: string;
  amount?: number;
  currency: string;
  isActive: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentLinkData {
  projectId: string;
  type: PaymentLinkType;
  title: string;
  description?: string;
  amount?: number;
  currency?: string;
}

/**
 * Payment Types
 */
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentProvider = "stripe" | "omise";

export interface Payment {
  id: string;
  paymentLinkId: string;
  projectId: string;
  payerId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerPaymentId?: string;
  message?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payer Types
 */
export interface Payer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePayerData {
  email: string;
  name?: string;
  phone?: string;
}

/**
 * Invoice Types
 */
export type InvoiceStatus = "draft" | "sent" | "paid" | "expired";

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  payerId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceData {
  projectId: string;
  payerId: string;
  items: Omit<InvoiceItem, "id" | "invoiceId">[];
  dueDate: string;
  currency?: string;
  tax?: number;
}

/**
 * Webhook Types
 */
export type WebhookProvider = "stripe" | "omise";

export interface WebhookEvent {
  id: string;
  provider: WebhookProvider;
  eventType: string;
  payload: Record<string, unknown>;
  processedAt?: string;
  createdAt: string;
}

/**
 * Dashboard Stats Types
 */
export interface ProjectStats {
  totalRevenue: number;
  totalPayments: number;
  paidPayments: number;
  pendingPayments: number;
  totalInvoices: number;
  paidInvoices: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalRevenue: number;
  totalPayments: number;
  revenueByProject: {
    projectId: string;
    projectName: string;
    revenue: number;
  }[];
  revenueByProvider: {
    provider: PaymentProvider;
    revenue: number;
  }[];
  recentPayments: Payment[];
}
