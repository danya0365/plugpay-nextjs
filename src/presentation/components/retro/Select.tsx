"use client";

import { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Windows 98 style dropdown select
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="retro-input-wrapper">
        {label && (
          <label htmlFor={selectId} className="retro-input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`retro-select ${error ? "retro-input-error" : ""} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="retro-input-error-text">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
