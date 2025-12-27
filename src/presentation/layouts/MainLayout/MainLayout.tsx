"use client";

import { MainFooter } from "./MainFooter";
import { MainHeader } from "./MainHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout - Modern full-screen layout
 * Features:
 * - Full viewport height (h-screen)
 * - No scroll on body
 * - Glassmorphism & gradient effects
 * - Flex container: Header → Content → Footer
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <MainHeader />
      <main className="main-content">{children}</main>
      <MainFooter />
    </div>
  );
}
