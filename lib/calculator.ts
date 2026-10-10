"use client";

import { useSyncExternalStore } from "react";
import { extras, packages, type ExtraId, type PackageId } from "@/content/site";

export type CalcState = {
  area: number;
  type: PackageId;
  extras: ExtraId[];
};

/* Крошечный стор: пакеты из секции «Услуги» переключают калькулятор */
let state: CalcState = { area: 64, type: "capital", extras: ["warmFloor"] };
const listeners = new Set<() => void>();

export const calcStore = {
  get: () => state,
  set(patch: Partial<CalcState>) {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export const useCalc = () => useSyncExternalStore(calcStore.subscribe, calcStore.get, calcStore.get);

export type Line = { id: string; label: string; amount: number; included?: boolean };

export function computeEstimate({ area, type, extras: selected }: CalcState) {
  const pkg = packages.find((p) => p.id === type)!;
  const lines: Line[] = [
    { id: "base", label: `${pkg.name} ремонт · ${area} м² × ${pkg.price.toLocaleString("ru-RU")} ₴`, amount: area * pkg.price },
  ];

  let percent = 0;
  for (const ex of extras) {
    if (!selected.includes(ex.id)) continue;
    if (ex.includedIn?.includes(type)) {
      lines.push({ id: ex.id, label: ex.label, amount: 0, included: true });
      continue;
    }
    if (ex.kind === "percent") {
      percent += ex.value;
      continue;
    }
    lines.push({ id: ex.id, label: ex.label, amount: ex.kind === "perM2" ? ex.value * area : ex.value });
  }

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  if (percent) {
    lines.push({ id: "fastTrack", label: "Ускоренный график", amount: Math.round((subtotal * percent) / 100) });
  }
  const total = lines.reduce((s, l) => s + l.amount, 0);

  // Срок: базовый темп пакета, нелинейно растёт с площадью
  const pace = { cosmetic: 0.55, capital: 1.05, design: 1.45 }[type];
  const base = { cosmetic: 14, capital: 24, design: 40 }[type];
  let days = base + pace * area;
  if (selected.includes("fastTrack")) days *= 0.75;
  const daysFrom = Math.round(days * 0.92);
  const daysTo = Math.round(days * 1.08);

  return { lines, total, daysFrom, daysTo };
}
