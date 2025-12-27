"use client";

/**
 * RetroLanding - Windows 98 / IE5 style landing page
 * Classic web design with tables, animated GIFs style, and marquee
 */
export function RetroLanding() {
  const features = [
    { icon: "📁", title: "Project Management", description: "สร้างและจัดการหลายโปรเจค" },
    { icon: "💰", title: "Payment Link", description: "สร้างลิงก์รับเงินได้ทันที" },
    { icon: "📋", title: "Invoice & Billing", description: "ออกใบแจ้งยอด/ใบชำระเงิน" },
    { icon: "💳", title: "Stripe & Omise", description: "รองรับหลายช่องทางชำระเงิน" },
  ];

  return (
    <div className="retro-landing">
      {/* Welcome Banner */}
      <div className="retro-welcome-banner">
        <div className="retro-marquee">
          <span>★ ★ ★ Welcome to PlugPay - Plug your web. Get paid! ★ ★ ★</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="retro-landing-content">
        {/* Header with construction GIF style */}
        <div className="retro-landing-header">
          <span className="retro-construction">🚧</span>
          <h1 className="retro-landing-title">
            PlugPay
            <br />
            <span className="retro-landing-subtitle">Payment Platform</span>
          </h1>
          <span className="retro-construction">🚧</span>
        </div>

        {/* Counter */}
        <div className="retro-counter">
          <span className="retro-counter-icon">👁️</span>
          <span>You are visitor #</span>
          <span className="retro-counter-number">001,337</span>
        </div>

        {/* Horizontal Rule with graphics */}
        <div className="retro-hr">
          <span>★</span>
          <hr />
          <span>★</span>
        </div>

        {/* Description */}
        <div className="retro-description">
          <p>
            <span className="retro-new-icon">🆕</span>
            <strong>PlugPay</strong> คือระบบศูนย์กลางสำหรับรับชำระเงินจากหลายเว็บไซต์
            <br />
            เพียงแค่ฝังลิงก์ หรือ QR Code ก็สามารถรับเงินได้ทันที!
          </p>
        </div>

        {/* Features Table */}
        <div className="retro-features-section">
          <h2 className="retro-section-title">
            <span>📌</span> Key Features <span>📌</span>
          </h2>

          <table className="retro-features-table">
            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="retro-feature-icon-cell">{feature.icon}</td>
                  <td className="retro-feature-title-cell">
                    <a href="#" className="retro-link">
                      {feature.title}
                    </a>
                  </td>
                  <td className="retro-feature-desc-cell">{feature.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Horizontal Rule */}
        <div className="retro-hr">
          <span>★</span>
          <hr />
          <span>★</span>
        </div>

        {/* CTA Buttons */}
        <div className="retro-cta-section">
          <button className="retro-btn retro-btn-primary">
            📥 Download Now
          </button>
          <button className="retro-btn">
            📧 Sign Guestbook
          </button>
          <button className="retro-btn">
            🔗 Add to Favorites
          </button>
        </div>

        {/* Email link */}
        <div className="retro-email-section">
          <span>📬 Email:</span>
          <a href="mailto:hello@plugpay.dev" className="retro-link">
            hello@plugpay.dev
          </a>
        </div>

        {/* Awards/Badges */}
        <div className="retro-badges">
          <div className="retro-badge">
            <span className="retro-badge-icon">🏆</span>
            <span className="retro-badge-text">Best of Web 98</span>
          </div>
          <div className="retro-badge">
            <span className="retro-badge-icon">⭐</span>
            <span className="retro-badge-text">5 Star Site</span>
          </div>
          <div className="retro-badge">
            <span className="retro-badge-icon">🎨</span>
            <span className="retro-badge-text">Cool Site Award</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="retro-landing-footer">
          <span>[ </span>
          <a href="/" className="retro-link">Home</a>
          <span> | </span>
          <a href="/about" className="retro-link">About</a>
          <span> | </span>
          <a href="/features" className="retro-link">Features</a>
          <span> | </span>
          <a href="/contact" className="retro-link">Contact</a>
          <span> ]</span>
        </div>

        {/* Copyright */}
        <div className="retro-copyright">
          <p>© 1998-2024 PlugPay. All Rights Reserved.</p>
          <p>Best viewed with Internet Explorer 5.0 at 800x600</p>
          <p>
            <span className="retro-ie-icon">🌐</span>
            Made for the World Wide Web
          </p>
        </div>
      </div>
    </div>
  );
}
