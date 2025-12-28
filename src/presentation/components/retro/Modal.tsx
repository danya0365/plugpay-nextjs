"use client";

import { useCallback, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  icon?: string;
}

/**
 * Windows 98 style dialog box
 */
export function Modal({
  isOpen,
  onClose,
  title = "Dialog",
  children,
  footer,
  icon = "📋",
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

  if (!isOpen) return null;

  return (
    <div
      className="retro-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="retro-modal">
        {/* Title Bar */}
        <div className="retro-modal-titlebar">
          <div className="retro-modal-titlebar-left">
            <span className="retro-modal-icon">{icon}</span>
            <span className="retro-modal-title">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="retro-modal-close"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="retro-modal-body">{children}</div>

        {/* Footer */}
        {footer && <div className="retro-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
