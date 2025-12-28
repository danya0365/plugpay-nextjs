"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  loading?: boolean;
  icon?: React.ReactNode;
}

/**
 * Windows 98 style 3D button
 */
export function Button({
  variant = "default",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "retro-btn",
    primary: "retro-btn retro-btn-primary",
  };

  return (
    <button
      className={`${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span>⏳</span>
      ) : (
        <>
          {icon && <span className="retro-btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
