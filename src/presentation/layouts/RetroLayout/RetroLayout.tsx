"use client";

import { RetroFooter } from "./RetroFooter";
import { RetroHeader } from "./RetroHeader";

interface RetroLayoutProps {
  children: React.ReactNode;
}

/**
 * RetroLayout - Internet Explorer 5 on Windows 98 style
 * Features:
 * - Full viewport height (h-screen)
 * - No scroll on body
 * - Windows 98 color scheme (#c0c0c0, #000080)
 * - 3D borders (ridge, inset, outset)
 */
export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <div className="retro-layout">
      <RetroHeader />
      <main className="retro-content">{children}</main>
      <RetroFooter />
    </div>
  );
}
