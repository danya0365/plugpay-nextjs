"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";

/**
 * MainLanding - Modern landing page component
 * Features gradient backgrounds, glassmorphism, and react-spring animations
 */
export function MainLanding() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Hero text animation
  const heroSpring = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.gentle,
  });

  // CTA button animation
  const ctaSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 300,
    config: config.wobbly,
  });

  // Features data
  const features = [
    {
      icon: "🎯",
      title: "Multi-Project",
      description: "จัดการหลายโปรเจคในที่เดียว แยกรายได้ชัดเจน",
    },
    {
      icon: "💳",
      title: "Payment Link",
      description: "สร้างลิงก์รับเงินได้ทันที Donate, Fixed, Custom",
    },
    {
      icon: "📄",
      title: "Invoice & Billing",
      description: "ออกใบแจ้งยอด พร้อมติดตามสถานะ",
    },
    {
      icon: "⚡",
      title: "Stripe & Omise",
      description: "รองรับ Card, QR Code, PromptPay",
    },
    {
      icon: "📊",
      title: "Dashboard",
      description: "รายงานรายได้ แยกตามโปรเจค ช่องทาง ช่วงเวลา",
    },
    {
      icon: "🔔",
      title: "Webhook",
      description: "อัปเดตสถานะ payment อัตโนมัติ",
    },
  ];

  return (
    <div className="main-landing">
      {/* Hero Section */}
      <section className="main-hero">
        <div className="main-hero-glow" />
        <div className="main-hero-content">
          <animated.div style={heroSpring} className="main-hero-text">
            <span className="main-hero-badge">🚀 PlugPay v1.0</span>
            <h1 className="main-hero-title">
              <span className="main-hero-title-gradient">Plug your web.</span>
              <br />
              <span>Get paid.</span>
            </h1>
            <p className="main-hero-subtitle">
              แพลตฟอร์มรับเงิน / Donate / ออกใบแจ้งหนี้
              <br />
              สำหรับหลายโปรเจคในที่เดียว
            </p>
          </animated.div>

          <animated.div style={ctaSpring} className="main-hero-cta">
            <a href="/register" className="main-cta-primary">
              เริ่มต้นใช้งานฟรี
              <span className="main-cta-arrow">→</span>
            </a>
            <a href="#features" className="main-cta-secondary">
              ดูฟีเจอร์ทั้งหมด
            </a>
          </animated.div>

          <div className="main-hero-stats">
            <div className="main-stat">
              <span className="main-stat-value">1K+</span>
              <span className="main-stat-label">Users</span>
            </div>
            <div className="main-stat">
              <span className="main-stat-value">50K+</span>
              <span className="main-stat-label">Transactions</span>
            </div>
            <div className="main-stat">
              <span className="main-stat-value">99.9%</span>
              <span className="main-stat-label">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="main-features">
        <div className="main-features-header">
          <h2 className="main-features-title">ทุกอย่างที่คุณต้องการ</h2>
          <p className="main-features-subtitle">
            เครื่องมือครบครันสำหรับ Dev, Creator และ Indie Maker
          </p>
        </div>

        <div className="main-features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isHovered={hoveredFeature === index}
              onHover={() => setHoveredFeature(index)}
              onLeave={() => setHoveredFeature(null)}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="main-final-cta">
        <div className="main-final-cta-content">
          <h2 className="main-final-cta-title">พร้อมรับเงินจากทุกที่?</h2>
          <p className="main-final-cta-subtitle">
            เริ่มต้นใช้งาน PlugPay วันนี้ ไม่มีค่าใช้จ่ายเริ่มต้น
          </p>
          <a href="/register" className="main-cta-primary main-cta-large">
            สร้างบัญชีฟรี
          </a>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component with hover animation
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  isHovered,
  onHover,
  onLeave,
  delay,
}: FeatureCardProps) {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay,
    config: config.gentle,
  });

  const hoverSpring = useSpring({
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    boxShadow: isHovered
      ? "0 20px 40px rgba(99, 102, 241, 0.15)"
      : "0 4px 6px rgba(0, 0, 0, 0.05)",
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{ ...cardSpring, ...hoverSpring }}
      className="main-feature-card"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="main-feature-icon">{icon}</div>
      <h3 className="main-feature-title">{title}</h3>
      <p className="main-feature-description">{description}</p>
    </animated.div>
  );
}
