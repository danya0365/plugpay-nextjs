"use client";

import { useEffect, useRef, useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Windows 98 style popup menu
 */
export function Popover({ trigger, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div ref={popoverRef} className="retro-popover absolute top-full mt-0.5 left-0">
          {children}
        </div>
      )}
    </div>
  );
}

interface PopoverItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
}

export function PopoverItem({ children, onClick, icon, shortcut }: PopoverItemProps) {
  return (
    <button className="retro-popover-item" onClick={onClick}>
      <span className="retro-popover-item-icon">{icon || " "}</span>
      <span className="retro-popover-item-text">{children}</span>
      {shortcut && <span className="retro-popover-item-shortcut">{shortcut}</span>}
    </button>
  );
}

export function PopoverSeparator() {
  return <div className="retro-popover-separator" />;
}
