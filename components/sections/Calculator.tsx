"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useId, useMemo, useState } from "react";
import { extras, packages } from "@/content/site";
import { calcStore, computeEstimate, useCalc } from "@/lib/calculator";
import { formatUAH } from "@/lib/format";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { roomFeatures } from "@/lib/room";
import { useLeadModal } from "@/components/providers/LeadModal";
import { Button } from "@/components/ui/Button";
import { Odometer } from "@/components/ui/Odometer";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Check, Plus } from "@/components/ui/Icons";
import { RoomIso } from "@/components/visuals/RoomIso";

const Room3D = dynamic(() => import("@/components/visuals/Room3D"), { ssr: false });

const MIN = 20;
const MAX = 200;

export function Calculator() {
  const state = useCalc();
  const { area, type, extras: selected } = state;
  const estimate = useMemo(() => computeEstimate(state), [state]);
  const features = useMemo(() => roomFeatures(type, selected), [type, selected]);
  const { open } = useLeadModal();
  const uid = useId();

  // 3D только на десктопе с мышью и без reduced-motion; при низком fps — откат на SVG
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const [lowFps, setLowFps] = useState(false);
  const use3D = fine && !reduce && !lowFps;

  const fill = ((area - MIN) / (MAX - MIN)) * 100;

  const toggle = (id: (typeof extras)[number]["id"]) =>
    calcStore.set({ extras: selected.includes(id) ? selected.filter((e) => e !== id) : [...selected, id] });

  return (
    <section id="calculator" aria-labelledby="calc-title" className="relative py-28 md:py-40">
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Калькулятор</SectionLabel>
            <RevealText as="h2" text={"Скільки коштує\n*ваш* ремонт"} className="h2 mt-8" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-stone">
              Рухайте повзунок і обирайте опції — кімната праворуч «відремонтується» разом із розрахунком.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-12">
          {/* Параметры */}
          <Reveal className="lg:col-span-5">
            <div className="glass h-full rounded-[2rem] p-6 sm:p-8 md:p-10">
              <div className="flex items-end justify-between gap-4">
                <label htmlFor={`${uid}-area`} className="eyebrow text-stone">Площа квартири</label>
                <p className="font-serif text-6xl leading-none tracking-tight">
                  <Odometer value={area} />
                  <span className="ml-1 text-3xl text-stone">м²</span>
                </p>
              </div>
              <input
                id={`${uid}-area`}
                type="range"
                min={MIN}
                max={MAX}
                step={1}
                value={area}
                onChange={(e) => calcStore.set({ area: Number(e.target.value) })}
                className="range mt-6"
                style={{ "--fill": `${fill}%` } as React.CSSProperties}
                aria-valuetext={`${area} квадратних метрів`}
                data-cursor="Тягніть"
              />
              <div aria-hidden className="mt-2 flex justify-between font-mono text-[10px] text-stone">
                {[20, 60, 100, 140, 200].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              <fieldset className="mt-10">
                <legend className="eyebrow text-stone">Тип ремонту</legend>
                <LayoutGroup id="calc-type">
                  <div role="radiogroup" className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-graphite/10 bg-paper/70 p-1">
                    {packages.map((p) => {
                      const active = p.id === type;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => calcStore.set({ type: p.id })}
                          className={`relative rounded-full px-2 py-3 text-[13px] font-semibold transition-colors duration-300 sm:text-sm ${active ? "text-paper" : "text-graphite/70 hover:text-graphite"}`}
                        >
                          {active && (
                            <motion.span
                              layoutId="calc-type-pill"
                              className="absolute inset-0 rounded-full bg-graphite"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <span className="relative">{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </LayoutGroup>
              </fieldset>

              <fieldset className="mt-10">
                <legend className="eyebrow text-stone">Додатково</legend>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {extras.map((ex) => {
                    const included = ex.includedIn?.includes(type);
                    const on = selected.includes(ex.id) || !!included;
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        aria-disabled={included}
                        onClick={() => !included && toggle(ex.id)}
                        className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                          on ? "border-graphite bg-graphite text-paper" : "border-graphite/12 bg-paper/60 hover:border-graphite/40"
                        } ${included ? "cursor-default opacity-80" : ""}`}
                      >
                        <span
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                            on ? "border-terracotta-light bg-terracotta-light text-graphite" : "border-graphite/25"
                          }`}
                        >
                          {on ? <Check width={14} height={14} /> : <Plus width={14} height={14} className="text-graphite/50" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-tight">{ex.label}</span>
                          <span className={`mt-0.5 block font-mono text-[11px] ${on ? "text-paper/75" : "text-stone"}`}>
                            {included ? "входить у пакет" : ex.hint}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </Reveal>

          {/* Результат */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="on-dark relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-graphite text-cream">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#3a3530,#22201d_70%)] sm:aspect-[16/9]">
                <div aria-hidden className="blueprint-grid-dark absolute inset-0" />
                {use3D ? (
                  <Room3D f={features} onLowFps={() => setLowFps(true)} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center p-6">
                    <RoomIso f={features} className="h-full w-full max-w-[560px]" />
                  </div>
                )}
                <div className="pointer-events-none absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="eyebrow glass-dark rounded-full px-3 py-1.5 text-[10px] text-cream/80">
                    {packages.find((p) => p.id === type)!.name} · {area} м²
                  </span>
                  {use3D && (
                    <span className="eyebrow glass-dark hidden rounded-full px-3 py-1.5 text-[10px] text-cream/60 md:inline-block">
                      3D · рухайте мишею
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="eyebrow text-cream/60">Попередня вартість</p>
                    <p className="mt-3 font-serif text-[clamp(2.9rem,6vw,5rem)] leading-none tracking-tight" aria-live="polite">
                      <Odometer value={estimate.total} />
                      <span className="ml-2 text-[0.55em] text-terracotta-light">₴</span>
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="eyebrow text-cream/60">Термін</p>
                    <p className="mt-3 font-serif text-3xl leading-none">
                      {estimate.daysFrom}–{estimate.daysTo} <span className="text-lg text-cream/60">днів</span>
                    </p>
                  </div>
                </div>

                <ul className="mt-8 border-t border-cream/10">
                  <AnimatePresence initial={false}>
                    {estimate.lines.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-cream/10 py-3 text-sm"
                      >
                        <span className="text-cream/75">{l.label}</span>
                        <span className="shrink-0 font-mono text-[13px] text-cream">
                          {l.included ? "включено" : formatUAH(l.amount)}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="light" onClick={() => open("calculator")}>
                    Зафіксувати кошторис на замірі
                  </Button>
                  <p className="max-w-[17rem] text-xs leading-relaxed text-cream/60">
                    Розрахунок орієнтовний. Точний кошторис ви отримаєте після безкоштовного заміру — і далі він не змінюється.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
