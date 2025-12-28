"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Windows 98 style input with inset border
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="retro-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="retro-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`retro-input ${error ? "retro-input-error" : ""} ${className}`}
          {...props}
        />
        {error && <p className="retro-input-error-text">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
