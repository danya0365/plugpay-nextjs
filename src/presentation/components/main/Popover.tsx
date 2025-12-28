"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

/**
 * Modern Popover component with smooth animations
 */
export function Popover({
  trigger,
  children,
  position = "bottom",
  align = "start",
}: PopoverProps) {
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

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const popoverSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-8px)",
    config: config.stiff,
  });

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const alignClasses = {
    start: position === "top" || position === "bottom" ? "left-0" : "top-0",
    center:
      position === "top" || position === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "top-1/2 -translate-y-1/2",
    end: position === "top" || position === "bottom" ? "right-0" : "bottom-0",
  };

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <animated.div
          ref={popoverRef}
          style={popoverSpring}
          className={`main-popover absolute ${positionClasses[position]} ${alignClasses[align]}`}
        >
          {children}
        </animated.div>
      )}
    </div>
  );
}

interface PopoverItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function PopoverItem({ children, onClick, icon }: PopoverItemProps) {
  return (
    <button className="main-popover-item" onClick={onClick}>
      {icon && <span className="main-popover-item-icon">{icon}</span>}
      {children}
    </button>
  );
}
