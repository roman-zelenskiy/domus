"use client";

import { motion } from "motion/react";
import { formatNumber } from "@/lib/format";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** Сумма, цифры которой прокручиваются по разрядам, как в механическом счётчике */
export function Odometer({ value, className = "" }: { value: number; className?: string }) {
  const chars = formatNumber(value).split("");
  return (
    <span className={`inline-flex items-baseline [font-feature-settings:'lnum','tnum'] ${className}`}>
      <span className="sr-only">{formatNumber(value)}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((c, i) => {
          // ключ считаем справа, чтобы разряды сохраняли идентичность при смене длины числа
          const key = chars.length - i;
          return /\d/.test(c) ? (
            <Digit key={`d${key}`} value={Number(c)} />
          ) : (
            <span key={`s${key}`} className="inline-block w-[0.22em]" />
          );
        })}
      </span>
    </span>
  );
}
