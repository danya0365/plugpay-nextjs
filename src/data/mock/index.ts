import type {
    Invoice,
    InvoiceItem,
    Payer,
    Payment,
    PaymentLink,
    Project,
    User,
} from "@/src/domain/types";

/**
 * Mock Users
 */
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "john@example.com",
    name: "John Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    email: "jane@example.com",
    name: "Jane Creator",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

/**
 * Mock Projects
 */
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    userId: "user-1",
    name: "My Awesome Blog",
    slug: "my-awesome-blog",
    description: "A blog about web development and tech",
    websiteUrl: "https://myblog.dev",
    donateEnabled: true,
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
  },
  {
    id: "proj-2",
    userId: "user-1",
    name: "Open Source Tool",
    slug: "open-source-tool",
    description: "A useful tool for developers",
    websiteUrl: "https://github.com/john/tool",
    donateEnabled: true,
    isActive: true,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-05-15T00:00:00Z",
  },
  {
    id: "proj-3",
    userId: "user-1",
    name: "Side Project",
    slug: "side-project",
    description: "Just a fun side project",
    donateEnabled: false,
    isActive: false,
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-04-01T00:00:00Z",
  },
];

/**
 * Mock Payment Links
 */
export const mockPaymentLinks: PaymentLink[] = [
  {
    id: "link-1",
    projectId: "proj-1",
    type: "donate",
    title: "Support My Blog",
    description: "Buy me a coffee ☕",
    currency: "THB",
    isActive: true,
    slug: "support-my-blog",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "link-2",
    projectId: "proj-1",
    type: "fixed",
    title: "Premium Access",
    description: "Get premium content access",
    amount: 299,
    currency: "THB",
    isActive: true,
    slug: "premium-access",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "link-3",
    projectId: "proj-2",
    type: "donate",
    title: "Sponsor Development",
    description: "Help fund open source development",
    currency: "THB",
    isActive: true,
    slug: "sponsor-dev",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
];

/**
 * Mock Payers
 */
export const mockPayers: Payer[] = [
  {
    id: "payer-1",
    email: "supporter1@example.com",
    name: "Alex Supporter",
    phone: "0812345678",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "payer-2",
    email: "fan@example.com",
    name: "Big Fan",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "payer-3",
    email: "company@corp.com",
    name: "Corp Inc.",
    phone: "0898765432",
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-04-01T00:00:00Z",
  },
];

/**
 * Mock Payments
 */
export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    paymentLinkId: "link-1",
    projectId: "proj-1",
    payerId: "payer-1",
    amount: 100,
    currency: "THB",
    status: "paid",
    provider: "omise",
    providerPaymentId: "chrg_test_123",
    message: "Great blog! Keep it up!",
    paidAt: "2024-06-01T10:30:00Z",
    createdAt: "2024-06-01T10:25:00Z",
    updatedAt: "2024-06-01T10:30:00Z",
  },
  {
    id: "pay-2",
    paymentLinkId: "link-2",
    projectId: "proj-1",
    payerId: "payer-2",
    amount: 299,
    currency: "THB",
    status: "paid",
    provider: "stripe",
    providerPaymentId: "pi_test_456",
    paidAt: "2024-06-05T14:20:00Z",
    createdAt: "2024-06-05T14:15:00Z",
    updatedAt: "2024-06-05T14:20:00Z",
  },
  {
    id: "pay-3",
    paymentLinkId: "link-3",
    projectId: "proj-2",
    payerId: "payer-3",
    amount: 1000,
    currency: "THB",
    status: "paid",
    provider: "omise",
    providerPaymentId: "chrg_test_789",
    message: "Love this tool!",
    paidAt: "2024-06-10T09:00:00Z",
    createdAt: "2024-06-10T08:55:00Z",
    updatedAt: "2024-06-10T09:00:00Z",
  },
  {
    id: "pay-4",
    paymentLinkId: "link-1",
    projectId: "proj-1",
    amount: 50,
    currency: "THB",
    status: "pending",
    provider: "omise",
    createdAt: "2024-06-15T11:00:00Z",
    updatedAt: "2024-06-15T11:00:00Z",
  },
  {
    id: "pay-5",
    paymentLinkId: "link-2",
    projectId: "proj-1",
    payerId: "payer-1",
    amount: 299,
    currency: "THB",
    status: "failed",
    provider: "stripe",
    createdAt: "2024-06-12T16:00:00Z",
    updatedAt: "2024-06-12T16:05:00Z",
  },
];

/**
 * Mock Invoice Items
 */
const mockInvoiceItems: InvoiceItem[] = [
  {
    id: "item-1",
    invoiceId: "inv-1",
    description: "Web Development Consultation",
    quantity: 2,
    unitPrice: 1500,
    amount: 3000,
  },
  {
    id: "item-2",
    invoiceId: "inv-1",
    description: "Code Review Service",
    quantity: 1,
    unitPrice: 500,
    amount: 500,
  },
  {
    id: "item-3",
    invoiceId: "inv-2",
    description: "Logo Design",
    quantity: 1,
    unitPrice: 5000,
    amount: 5000,
  },
];

/**
 * Mock Invoices
 */
export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    projectId: "proj-1",
    payerId: "payer-3",
    invoiceNumber: "INV-2024-001",
    status: "paid",
    items: mockInvoiceItems.filter((i) => i.invoiceId === "inv-1"),
    subtotal: 3500,
    tax: 245,
    total: 3745,
    currency: "THB",
    dueDate: "2024-06-30T00:00:00Z",
    paidAt: "2024-06-25T10:00:00Z",
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-25T10:00:00Z",
  },
  {
    id: "inv-2",
    projectId: "proj-2",
    payerId: "payer-3",
    invoiceNumber: "INV-2024-002",
    status: "sent",
    items: mockInvoiceItems.filter((i) => i.invoiceId === "inv-2"),
    subtotal: 5000,
    tax: 350,
    total: 5350,
    currency: "THB",
    dueDate: "2024-07-15T00:00:00Z",
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-06-15T00:00:00Z",
  },
  {
    id: "inv-3",
    projectId: "proj-1",
    payerId: "payer-1",
    invoiceNumber: "INV-2024-003",
    status: "draft",
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: "THB",
    dueDate: "2024-07-30T00:00:00Z",
    createdAt: "2024-06-20T00:00:00Z",
    updatedAt: "2024-06-20T00:00:00Z",
  },
];
