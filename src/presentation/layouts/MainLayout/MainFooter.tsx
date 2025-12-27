"use client";

/**
 * Modern Footer component for MainLayout
 * Minimal design with essential links
 */
export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer-container">
        {/* Left side - Logo & Copyright */}
        <div className="main-footer-brand">
          <span className="main-footer-logo">🔌 PlugPay</span>
          <span className="main-footer-copyright">
            © {currentYear} PlugPay. All rights reserved.
          </span>
        </div>

        {/* Right side - Links */}
        <nav className="main-footer-nav">
          <a href="/privacy" className="main-footer-link">
            Privacy
          </a>
          <a href="/terms" className="main-footer-link">
            Terms
          </a>
          <a href="/contact" className="main-footer-link">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
