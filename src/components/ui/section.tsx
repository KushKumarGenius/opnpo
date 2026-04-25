import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  as?: "section" | "div";
};

export function Section({
  id,
  as: Tag = "section",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`} {...props}>
      {children}
    </Tag>
  );
}
