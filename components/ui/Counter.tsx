"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

type Props = {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const fmt = (v: number, decimals: number) =>
  decimals ? v.toFixed(decimals).replace(".", ",") : formatNumber(v);

/** Число, которое «накручивается» при появлении в зоне видимости */
export function Counter({ to, decimals = 0, duration = 2.2, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, to, {
      duration: reduce ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = prefix + fmt(v, decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration, prefix, suffix]);

  return (
    <span className={className}>
      <span className="sr-only">
        {prefix}
        {fmt(to, decimals)}
        {suffix}
      </span>
      <span ref={ref} aria-hidden className="lining-nums tabular-nums">
        {prefix}
        {fmt(0, decimals)}
        {suffix}
      </span>
    </span>
  );
}
