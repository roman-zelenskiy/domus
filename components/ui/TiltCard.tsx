"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { useFinePointer } from "@/lib/hooks";

const spring = { stiffness: 150, damping: 20, mass: 0.7 };

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Максимальный наклон в градусах */
  tilt?: number;
  glow?: string;
};

/** Карточка с лёгким наклоном и мягкой подсветкой, следующей за курсором */
export function TiltCard({ children, className = "", tilt = 3, glow = "rgb(216 139 105 / 0.22)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * tilt);
    ry.set((px - 0.5) * tilt);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ x: gx, y: gy, background: `radial-gradient(circle, ${glow}, transparent 62%)` }}
        className="pointer-events-none absolute top-0 left-0 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
