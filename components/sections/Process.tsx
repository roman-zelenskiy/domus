"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useI18n } from "@/components/providers/I18n";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE } from "@/components/ui/Reveal";

/** Строительный уровень: пузырёк смещается от скорости скролла и возвращается в центр */
function Level() {
  return (
    <div className="level-marker absolute top-0 left-0 z-10">
      <div className="relative h-5 w-14 -translate-x-1/2 -translate-y-1/2 rounded-md border border-cream/25 bg-graphite-2 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]">
        <div className="absolute inset-x-3 top-1/2 h-2.5 -translate-y-1/2 overflow-hidden rounded-full bg-[#c9d36b]/25 ring-1 ring-cream/15">
          <span className="absolute inset-y-0 left-1/2 w-px bg-cream/40" />
          <span className="level-bubble absolute top-1/2 left-1/2 block h-1.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6ef9a]" />
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { site, t: ui } = useI18n();
  const { steps } = site;
  const t = ui.process;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const track = q(".timeline-track")[0] as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const bubbleX = gsap.quickTo(q(".level-bubble"), "x", { duration: 0.6, ease: "power3.out" });
        const settle = gsap.delayedCall(0.18, () => bubbleX(0)).pause();

        // Линия таймлайна «строится» по мере скролла
        gsap.fromTo(
          q(".timeline-fill"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.6,
              onUpdate: (self) => {
                gsap.set(q(".level-marker"), { y: self.progress * track.offsetHeight });
                bubbleX(gsap.utils.clamp(-9, 9, self.getVelocity() / 260));
                settle.restart(true);
              },
            },
          },
        );

        // Каждый этап ложится, как кирпич: сверху, с лёгким доворотом
        q(".step").forEach((el, i) => {
          const brick = el.querySelector(".brick");
          const mortar = el.querySelector(".mortar");
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" } })
            .fromTo(
              brick,
              { y: -70, rotate: i % 2 ? 2.5 : -2.5, opacity: 0 },
              { y: 0, rotate: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
            )
            .fromTo(mortar, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.55");
        });
      });

      // Активный этап — для большой цифры слева и подсветки узлов (работает и без анимаций)
      q(".step").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" aria-labelledby="process-title" className="on-dark relative overflow-hidden bg-graphite py-28 text-cream md:py-40">
      <div aria-hidden className="blueprint-grid-dark pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(169_78_52/0.25),transparent_65%)]" />

      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div>
            <SectionLabel index="04" dark>
              {t.label}
            </SectionLabel>
            <RevealText as="h2" text={t.title} className="h2 mt-8" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/65">
                {t.lead}
              </p>
            </Reveal>
          </div>

          <div className="sticky top-[45vh] mt-16 hidden lg:block" aria-hidden>
            <div className="flex items-end gap-6">
              <div className="relative h-[9.5rem] w-[11rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="absolute inset-0 font-serif text-[10rem] leading-[0.95] text-terracotta-light"
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="pb-4">
                <p className="eyebrow text-cream/60">{t.of}</p>
                <p className="mt-2 max-w-[12rem] font-serif text-2xl leading-tight">{steps[active].title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="timeline-track relative pl-12 md:pl-20">
            {/* направляющая + «строящаяся» линия */}
            <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-cream/12 md:left-[27px]" />
            <span aria-hidden className="timeline-fill absolute top-0 bottom-0 left-[7px] w-px origin-top bg-terracotta-light md:left-[27px]" />
            <span aria-hidden className="absolute top-0 left-[7.5px] hidden md:left-[27.5px] lg:block">
              <Level />
            </span>

            {steps.map((s, i) => (
              <li key={s.title} className="step relative pb-6 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-9 -left-12 grid h-[15px] w-[15px] place-items-center rounded-full border transition-colors duration-500 md:-left-20 md:ml-5 ${
                    i <= active ? "border-terracotta-light bg-terracotta-light" : "border-cream/30 bg-graphite"
                  }`}
                >
                  <span className={`h-1 w-1 rounded-full ${i <= active ? "bg-graphite" : "bg-cream/40"}`} />
                </span>

                <article className="brick glass-dark relative rounded-[1.5rem] p-7 md:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="eyebrow text-terracotta-light">{t.stage(`0${i + 1}`)}</span>
                    <span className="eyebrow rounded-full border border-cream/15 px-3 py-1.5 text-[10px] text-cream/70">
                      {s.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-[2rem] leading-none md:text-[2.5rem]">{s.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-cream/65">{s.text}</p>
                  {/* «раствор» под кирпичом */}
                  <span aria-hidden className="mortar absolute inset-x-8 -bottom-[13px] h-px origin-center bg-gradient-to-r from-transparent via-terracotta-light/60 to-transparent" />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
