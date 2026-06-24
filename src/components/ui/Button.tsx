import Link from "next/link";
import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}>;

const variantClasses = {
  primary:
    "border-[#C41E3A] bg-[#C41E3A] text-white hover:border-[#a11930] hover:bg-[#a11930]",
  secondary:
    "border-[#1A2A3A] bg-white text-[#1A2A3A] hover:border-[#D4AF37] hover:text-[#D4AF37]",
  ghost: "border-transparent bg-transparent text-[#1A2A3A] hover:text-[#C41E3A]",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  type = "button",
  children,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition-colors ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
