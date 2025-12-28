"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { animated, useSpring } from "@react-spring/web";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/projects", label: "Projects", icon: "📁" },
  { href: "/payment-links", label: "Payment Links", icon: "🔗" },
  { href: "/invoices", label: "Invoices", icon: "📄" },
  { href: "/payers", label: "Payers", icon: "👥" },
];

/**
 * Modern Header component for MainLayout
 * Includes navigation, theme toggle, and layout switcher
 */
export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { layout, toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation for logo
  const logoSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 20 },
  });

  // Animation for nav items
  const navSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 150,
    config: { tension: 280, friction: 20 },
  });

  if (!mounted) {
    return (
      <header className="main-header">
        <div className="main-header-container">
          <div className="main-logo">🔌 PlugPay</div>
          <nav className="main-nav" />
        </div>
      </header>
    );
  }

  return (
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <animated.div style={logoSpring}>
          <Link href="/" className="main-logo">
            <span className="main-logo-icon">🔌</span>
            <span className="main-logo-text">PlugPay</span>
          </Link>
        </animated.div>

        {/* Navigation */}
        <animated.nav style={navSpring} className="main-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`main-nav-link ${pathname === item.href ? "main-nav-link-active" : ""}`}
            >
              <span className="main-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </animated.nav>

        {/* Actions */}
        <animated.div style={navSpring} className="main-header-actions">
          {/* Layout Toggle */}
          <button
            onClick={toggleLayout}
            className="main-icon-button"
            title={`Switch to ${layout === "main" ? "Retro" : "Main"} Layout`}
            aria-label="Toggle layout"
          >
            {layout === "main" ? "🖥️" : "✨"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="main-icon-button"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Sign In */}
          <Link href="/login" className="main-button-outline">
            Sign In
          </Link>
        </animated.div>
      </div>
    </header>
  );
}
