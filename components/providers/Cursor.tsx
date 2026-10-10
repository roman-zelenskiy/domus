"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

const INTERACTIVE = "a, button, [role='slider'], [role='checkbox'], [role='radio'], label, summary, [data-cursor]";

export function Cursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  if (!fine || reduce) return null;
  return <CursorInner />;
}

/** Курсор-перекрестие с «чертёжными» координатами */
function CursorInner() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });
  const coords = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"default" | "hover" | "text">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (coords.current) {
        coords.current.textContent = `x ${String(Math.round(e.clientX)).padStart(4, "0")} · y ${String(Math.round(e.clientY)).padStart(4, "0")}`;
      }
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input[type='text'], input[type='tel'], textarea")) {
        setMode("text");
        setLabel("");
        return;
      }
      const el = t.closest<HTMLElement>(INTERACTIVE);
      setMode(el ? "hover" : "default");
      setLabel(el?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  const ringScale = label ? 2.6 : mode === "hover" ? 1.7 : mode === "text" ? 0.4 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}>
      {/* кольцо-перекрестие */}
      <motion.div className="absolute top-0 left-0 mix-blend-difference" style={{ x: rx, y: ry }}>
        <motion.div
          className="relative -ml-5 -mt-5 h-10 w-10"
          animate={{ scale: ringScale }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <span className="absolute inset-0 rounded-full border border-cream/90" />
          <motion.span
            className="absolute inset-0"
            animate={{ opacity: mode === "default" ? 1 : 0, rotate: mode === "default" ? 0 : 45 }}
            transition={{ duration: 0.4 }}
          >
            <span className="absolute top-1/2 -left-2 h-px w-2 bg-cream/90" />
            <span className="absolute top-1/2 -right-2 h-px w-2 bg-cream/90" />
            <span className="absolute -top-2 left-1/2 h-2 w-px bg-cream/90" />
            <span className="absolute -bottom-2 left-1/2 h-2 w-px bg-cream/90" />
          </motion.span>
        </motion.div>
      </motion.div>

      {/* подпись действия */}
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <motion.span
          className="eyebrow absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-terracotta px-3 py-1.5 text-[10px] text-paper"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
          transition={{ duration: 0.35 }}
        >
          {label}
        </motion.span>
      </motion.div>

      {/* точка + координаты */}
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <span className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-terracotta" />
        <motion.span
          ref={coords}
          className="absolute top-6 left-6 font-mono text-[9px] tracking-wider whitespace-nowrap text-stone mix-blend-difference"
          animate={{ opacity: mode === "default" ? 0.75 : 0 }}
        />
      </motion.div>
    </div>
  );
}
