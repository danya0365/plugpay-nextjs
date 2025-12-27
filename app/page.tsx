import { LandingView } from "@/src/presentation/components/landing/LandingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PlugPay - Plug your web. Get paid.",
  description:
    "แพลตฟอร์มรับเงิน Donate และออกใบแจ้งหนี้ สำหรับหลายโปรเจคในที่เดียว ออกแบบมาเพื่อ Dev, Creator, Indie Maker",
  keywords: ["payment", "donate", "invoice", "stripe", "omise", "thailand"],
  openGraph: {
    title: "PlugPay - Plug your web. Get paid.",
    description:
      "แพลตฟอร์มรับเงิน Donate และออกใบแจ้งหนี้ สำหรับหลายโปรเจคในที่เดียว",
    type: "website",
  },
};

/**
 * Landing Page - Server Component for SEO
 * Renders layout-aware LandingView component
 */
export default function LandingPage() {
  return <LandingView />;
}
