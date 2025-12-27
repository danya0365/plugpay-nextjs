"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Retro Header component for RetroLayout
 * Simulates Internet Explorer 5 on Windows 98
 * Includes title bar, menu bar, toolbar, and address bar
 */
export function RetroHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [addressValue, setAddressValue] = useState("https://plugpay.dev/");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Menu Bar */}
      <div className="retro-menubar">
        <button className="retro-menu-item">
          <span className="retro-menu-underline">F</span>ile
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">E</span>dit
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">V</span>iew
        </button>
        <button className="retro-menu-item">
          Fav<span className="retro-menu-underline">o</span>rites
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">T</span>ools
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">H</span>elp
        </button>
      </div>

      {/* Toolbar */}
      <div className="retro-toolbar">
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">⬅️</span>
          <span className="retro-toolbar-label">Back</span>
        </button>
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">➡️</span>
          <span className="retro-toolbar-label">Forward</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🛑</span>
          <span className="retro-toolbar-label">Stop</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🔄</span>
          <span className="retro-toolbar-label">Refresh</span>
        </button>
        <button className="retro-toolbar-btn">
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
          />
        </div>
        <button className="retro-addressbar-go">Go</button>
      </div>
    </header>
  );
}
