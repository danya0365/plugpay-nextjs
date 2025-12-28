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
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Modern Select component with custom styling
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="main-input-wrapper">
        {label && (
          <label htmlFor={selectId} className="main-input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`main-select ${error ? "main-input-error" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
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
        {error && (
          <p id={`${selectId}-error`} className="main-input-error-text">
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

Select.displayName = "Select";
