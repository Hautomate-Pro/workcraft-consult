import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, subtitle, children }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{subtitle}</p>}
      {children}
    </div>
  );
}
