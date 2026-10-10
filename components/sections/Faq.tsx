"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { company, faq } from "@/content/site";
import { RevealText } from "@/components/ui/RevealText";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Telegram, Viber } from "@/components/ui/Icons";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-sand/45 py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="09">Питання</SectionLabel>
            <RevealText as="h2" text={"Часті\n*питання*"} className="h2 mt-8" />
            <Reveal delay={0.15}>
              <div className="mt-10 max-w-sm rounded-[1.75rem] border border-graphite/10 bg-paper p-7">
                <p className="font-serif text-2xl leading-tight">Не знайшли відповіді?</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  Напишіть менеджеру — відповідаємо протягом 15 хвилин, {company.hours.toLowerCase()}.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={company.messengers.telegram} className="inline-flex items-center gap-2 rounded-full bg-graphite px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-terracotta">
                    <Telegram width={16} height={16} /> Telegram
                  </a>
                  <a href={company.messengers.viber} className="inline-flex items-center gap-2 rounded-full border border-graphite/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-graphite">
                    <Viber width={16} height={16} /> Viber
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger as="ul" className="lg:col-span-7 lg:col-start-6" stagger={0.06}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem as="li" key={item.q} className="border-b hairline first:border-t">
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start gap-6 py-7 text-left md:py-8"
                  >
                    {/* номер — псевдоэлементом, чтобы не попадал в текст заголовка */}
                    <span
                      aria-hidden
                      data-n={`0${i + 1}`}
                      className="mt-2 font-mono text-xs text-terracotta before:content-[attr(data-n)]"
                    />
                    <span className="flex-1 font-serif text-[1.65rem] leading-[1.1] transition-colors group-hover:text-terracotta md:text-[2rem]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        isOpen ? "border-graphite bg-graphite text-paper" : "border-graphite/20"
                      }`}
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ease-[var(--ease-premium)] ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${uid}-a${i}`}
                      role="region"
                      aria-labelledby={`${uid}-q${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pl-10 leading-relaxed text-stone md:pl-12 md:text-[17px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
