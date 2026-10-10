"use client";

import { motion, type Variants } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, margin: "0px 0px -12% 0px" };

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Появление блока: fade + сдвиг */
export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const group: Variants = {
  hidden: {},
  show: (stagger: number = 0.09) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

/** Каскадное появление дочерних <StaggerItem> */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Comp className={className} variants={group} custom={stagger} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
