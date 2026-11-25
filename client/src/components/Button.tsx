import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary";
type SharedProps = { children: ReactNode; variant?: Variant; className?: string };
type ButtonLinkProps = SharedProps & Omit<LinkProps, "className" | "children">;
type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

const styles: Record<Variant, string> = {
  primary: "bg-brand text-brand-fg hover:brightness-105",
  secondary: "border border-line bg-surface-2 text-fg hover:bg-surface",
};

function getClassName(variant: Variant, className = "") {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60 ${styles[variant]} ${className}`;
}

export function Button(props: ButtonLinkProps): JSX.Element;
export function Button(props: NativeButtonProps): JSX.Element;
export function Button(props: ButtonLinkProps | NativeButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = getClassName(variant, className);
  if ("to" in props) {
    const linkProps = rest as Omit<LinkProps, "className" | "children">;
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
