"use client";

import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { useGsapHover } from "@/lib/gsap/useGsapHover";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-surface hover:opacity-90 transition-opacity duration-300",
  outline:
    "border border-accent text-accent hover:bg-accent hover:text-surface transition-colors duration-300",
  ghost: "text-foreground hover:text-accent transition-colors duration-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-[11px]",
  md: "px-8 py-3.5 text-[12px]",
  lg: "px-10 py-4 text-[13px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps): ReactElement {
  const hoverRef = useGsapHover<HTMLButtonElement>(1.04, 0, 0.3);

  return (
    <button
      ref={hoverRef}
      type={type}
      className={`inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[0.15em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
