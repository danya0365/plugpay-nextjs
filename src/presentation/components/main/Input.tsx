"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Modern Input component with focus ring and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="main-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="main-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`main-input ${error ? "main-input-error" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="main-input-error-text">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="main-input-helper">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
