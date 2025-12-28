"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useCallback, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Modern Modal component with backdrop blur and animations
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  // Escape key handler
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  // Animations
  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: config.stiff,
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-20px)",
    config: config.stiff,
  });

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <animated.div
      style={overlaySpring}
      className="main-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <animated.div
        style={modalSpring}
        className={`main-modal ${sizeClasses[size]}`}
      >
        {title && (
          <div className="main-modal-header">
            <h2 className="main-modal-title">{title}</h2>
            <button
              onClick={onClose}
              className="main-modal-close"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="main-modal-body">{children}</div>
        {footer && <div className="main-modal-footer">{footer}</div>}
      </animated.div>
    </animated.div>
  );
}
