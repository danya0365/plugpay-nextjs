"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/projects", label: "Projects", icon: "📁" },
  { href: "/payment-links", label: "Links", icon: "🔗" },
  { href: "/invoices", label: "Invoices", icon: "📄" },
  { href: "/payers", label: "Payers", icon: "👥" },
];

/**
 * Retro Header component for RetroLayout
 * Simulates Internet Explorer 5 on Windows 98
 * Includes title bar, menu bar, toolbar, and address bar
 */
export function RetroHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [addressValue, setAddressValue] = useState("https://plugpay.dev/");

  // Update address bar based on pathname
  useEffect(() => {
    setMounted(true);
    if (pathname) {
      setAddressValue(`https://plugpay.dev${pathname}`);
    }
  }, [pathname]);

  const handleGo = () => {
    // Extract path from address
    const path = addressValue.replace("https://plugpay.dev", "").replace("http://plugpay.dev", "");
    if (path && path !== pathname) {
      router.push(path || "/");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGo();
    }
  };

  if (!mounted) {
    return (
      <header className="retro-header">
        <div className="retro-titlebar">
          <div className="retro-titlebar-icon">🔌</div>
          <div className="retro-titlebar-text">PlugPay - Microsoft Internet Explorer</div>
        </div>
      </header>
    );
  }

  return (
    <header className="retro-header">
      {/* Title Bar */}
      <div className="retro-titlebar">
        <div className="retro-titlebar-left">
          <div className="retro-titlebar-icon">🔌</div>
          <div className="retro-titlebar-text">
            PlugPay - Microsoft Internet Explorer
          </div>
        </div>
        <div className="retro-titlebar-controls">
          <button className="retro-titlebar-btn retro-minimize" aria-label="Minimize">
            _
          </button>
          <button className="retro-titlebar-btn retro-maximize" aria-label="Maximize">
            □
          </button>
          <button className="retro-titlebar-btn retro-close" aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar - Now with navigation links */}
      <div className="retro-menubar">
        <Link href="/" className="retro-menu-item">
          <span className="retro-menu-underline">H</span>ome
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`retro-menu-item ${pathname === item.href ? "retro-menu-active" : ""}`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>

      {/* Toolbar */}
      <div className="retro-toolbar">
        <button className="retro-toolbar-btn" onClick={() => router.back()}>
          <span className="retro-toolbar-icon">⬅️</span>
          <span className="retro-toolbar-label">Back</span>
        </button>
        <button className="retro-toolbar-btn" onClick={() => router.forward()}>
          <span className="retro-toolbar-icon">➡️</span>
          <span className="retro-toolbar-label">Forward</span>
        </button>
        <button className="retro-toolbar-btn" onClick={() => window.location.reload()}>
          <span className="retro-toolbar-icon">🔄</span>
          <span className="retro-toolbar-label">Refresh</span>
        </button>
        <button className="retro-toolbar-btn" onClick={() => router.push("/")}>
          <span className="retro-toolbar-icon">🏠</span>
          <span className="retro-toolbar-label">Home</span>
        </button>
        <div className="retro-toolbar-separator" />
        <button className="retro-toolbar-btn" onClick={toggleLayout}>
          <span className="retro-toolbar-icon">✨</span>
          <span className="retro-toolbar-label">Modern</span>
        </button>
        <button
          className="retro-toolbar-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="retro-toolbar-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className="retro-toolbar-label">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="retro-addressbar">
        <label className="retro-addressbar-label">Address</label>
        <div className="retro-addressbar-input-wrapper">
          <span className="retro-addressbar-icon">📄</span>
          <input
            type="text"
            className="retro-addressbar-input"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="retro-addressbar-go" onClick={handleGo}>Go</button>
      </div>
    </header>
  );
}
