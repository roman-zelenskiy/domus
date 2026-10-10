"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

const clamp = (v: number) => Math.min(98, Math.max(2, v));

/**
 * Слайдер «до/после» со шторкой. Двигаем только transform:
 * внешний слой «до» сдвигается на (p−100)%, а картинка внутри — на столько же обратно.
 */
export function BeforeAfter({ before, after, beforeAlt, afterAlt, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const pos = useMotionValue(50);
  const outerX = useTransform(pos, (v) => `${v - 100}%`);
  const innerX = useTransform(pos, (v) => `${100 - v}%`);

  // Пузырёк уровня в ручке реагирует на скорость перетаскивания
  const velocity = useVelocity(pos);
  const bubble = useSpring(useTransform(velocity, [-300, 0, 300], [-7, 0, 7], { clamp: true }), { stiffness: 200, damping: 14 });

  const slider = useRef<HTMLDivElement>(null);
  useMotionValueEvent(pos, "change", (v) => slider.current?.setAttribute("aria-valuenow", String(Math.round(v))));

  const inView = useInView(ref, { once: true, margin: "-20%" });

  // Подсказка: шторка мягко «качнётся», если пользователь ещё не трогал слайдер
  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(pos, [50, 36, 62, 50], { duration: 2.4, ease: "easeInOut", delay: 0.4 });
    return () => controls.stop();
  }, [inView, pos]);

  const setFromClient = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    pos.set(clamp(((clientX - r.left) / r.width) * 100));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    const map: Record<string, number> = { ArrowLeft: -step, ArrowRight: step, ArrowDown: -step, ArrowUp: step };
    if (e.key in map) {
      e.preventDefault();
      touched.current = true;
      pos.set(clamp(pos.get() + map[e.key]));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      pos.set(e.key === "Home" ? 2 : 98);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative touch-pan-y select-none overflow-hidden rounded-[2rem] bg-sand ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        touched.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClient(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClient(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      data-cursor="Тягніть"
    >
      <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="pointer-events-none object-cover" />

      <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ x: outerX }}>
        <motion.div className="absolute inset-0 will-change-transform" style={{ x: innerX }}>
          <Image src={before} alt={beforeAlt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="pointer-events-none object-cover grayscale-[0.35]" />
        </motion.div>
        <span className="eyebrow glass absolute top-5 left-5 rounded-full px-3 py-1.5 text-[10px] text-graphite">До</span>
      </motion.div>
      <span className="eyebrow glass absolute top-5 right-5 rounded-full px-3 py-1.5 text-[10px] text-graphite">Після</span>

      {/* Ручка-уровень: прикреплена к правому краю слоя «до» */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ x: outerX }}>
        <div className="absolute top-0 right-0 bottom-0 w-[2px] translate-x-1/2 bg-paper shadow-[0_0_20px_rgb(0_0_0/0.25)]" />
        <div
          ref={slider}
          role="slider"
          tabIndex={0}
          aria-label="Порівняння до та після ремонту"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext="Перетягніть, щоб порівняти"
          onKeyDown={onKey}
          className="pointer-events-auto absolute top-1/2 right-0 flex h-16 w-16 translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-white/60 bg-paper/80 shadow-xl backdrop-blur-md active:cursor-grabbing"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" className="absolute left-2 text-graphite/60" aria-hidden>
            <path d="M9 3 5 7l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="relative h-3 w-7 overflow-hidden rounded-full bg-[#c9d36b]/35 ring-1 ring-graphite/15">
            <span className="absolute inset-y-0 left-1/2 w-px bg-graphite/30" />
            <motion.span style={{ x: bubble }} className="absolute top-1/2 left-1/2 -mt-[3px] -ml-[5px] block h-1.5 w-2.5 rounded-full bg-[#a3ad3e]" />
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" className="absolute right-2 text-graphite/60" aria-hidden>
            <path d="m5 3 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
