"use client";

import { Magnetic } from "./Magnetic";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "dark" | "light" | "ghost";

const styles: Record<Variant, { base: string; fill: string; icon: string }> = {
  primary: {
    base: "bg-terracotta text-paper",
    fill: "bg-graphite",
    icon: "bg-paper/15 text-paper",
  },
  dark: {
    base: "bg-graphite text-paper",
    fill: "bg-terracotta",
    icon: "bg-paper/10 text-paper",
  },
  light: {
    base: "bg-paper text-graphite",
    fill: "bg-terracotta-light",
    icon: "bg-graphite/8 text-graphite",
  },
  ghost: {
    base: "border border-graphite/20 text-graphite",
    fill: "bg-graphite",
    icon: "bg-graphite/6 text-graphite",
  },
};

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  icon?: boolean;
  size?: "md" | "lg";
};

type AsButton = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AsLink = Common & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Кнопка с заливкой «снизу вверх» при наведении и магнитным эффектом */
export function Button(props: AsButton | AsLink) {
  const { children, variant = "primary", className = "", magnetic = true, icon = true, size = "md", ...rest } = props;
  const s = styles[variant];
  const pad = size === "lg" ? "h-16 pl-8 pr-2.5 text-base" : "h-[52px] pl-6 pr-2 text-[15px]";
  const cls = `group relative isolate inline-flex items-center gap-4 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-colors duration-500 ${pad} ${s.base} ${variant === "ghost" ? "hover:text-paper" : ""} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:translate-y-0 ${s.fill}`}
      />
      <span className="relative">{children}</span>
      {icon && (
        <span
          aria-hidden
          className={`relative grid aspect-square place-items-center overflow-hidden rounded-full transition-colors duration-500 ${size === "lg" ? "h-11" : "h-9"} ${s.icon} ${variant === "ghost" ? "group-hover:bg-paper/15 group-hover:text-paper" : ""}`}
        >
          <ArrowRight className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-[250%]" width={16} height={16} />
          <ArrowRight className="absolute -translate-x-[250%] transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0" width={16} height={16} />
        </span>
      )}
    </>
  );

  const el =
    "href" in rest && rest.href !== undefined ? (
      <a {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {inner}
      </a>
    ) : (
      <button type="button" {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
        {inner}
      </button>
    );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
