"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Modern Button component with hover animations and variants
 */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    transform: isHovered && !disabled ? "scale(1.02)" : "scale(1)",
    config: { tension: 400, friction: 20 },
  });

  const variantClasses = {
    primary: "main-btn-primary",
    secondary: "main-btn-secondary",
    ghost: "main-btn-ghost",
    danger: "main-btn-danger",
  };

  const sizeClasses = {
    sm: "main-btn-sm",
    md: "",
    lg: "main-btn-lg",
  };

  return (
    <animated.button
      style={hoverSpring}
      className={`main-btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {loading ? (
        <span className="main-btn-spinner">⏳</span>
      ) : (
        <>
          {leftIcon && <span className="main-btn-icon">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="main-btn-icon">{rightIcon}</span>}
        </>
      )}
    </animated.button>
  );
}
