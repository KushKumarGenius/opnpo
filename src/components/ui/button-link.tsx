import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary";

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonLinkVariant;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-[15px] font-semibold tracking-tight transition-transform duration-200 ease-out will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants: Record<ButtonLinkVariant, string> = {
    primary:
      "bg-ink text-canvas shadow-soft hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-ink",
    secondary:
      "border border-border bg-surface/80 text-ink shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] backdrop-blur-sm hover:scale-[1.02] hover:bg-surface active:scale-[0.98] focus-visible:outline-accent",
  };

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
