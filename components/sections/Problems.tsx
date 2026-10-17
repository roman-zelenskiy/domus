"use client";

import { useRef } from "react";
import { useI18n } from "@/components/providers/I18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Check } from "@/components/ui/Icons";

/** Неровная кромка «шпателя» — передний край штукатурного слоя */
function TrowelEdge() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 400"
      preserveAspectRatio="none"
      className="absolute top-0 -left-[39px] h-full w-10 text-sand"
    >
      <path
        fill="currentColor"
        d="M40 0 H22 C14 30 30 52 18 84 C8 112 26 140 16 172 C6 206 28 228 20 262 C12 296 30 318 14 352 C8 370 20 388 16 400 H40 Z"
      />
    </svg>
  );
}

export function Problems() {
  const root = useRef<HTMLElement>(null);
  const { site, t: ui } = useI18n();
  const { problems } = site;
  const t = ui.problems;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".problem-row").forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 78%", end: "top 32%", scrub: 0.8 },
          });
          gsap.set(row.querySelector(".plaster"), { display: "block" });
          tl.fromTo(row.querySelector(".strike"), { scaleX: 0 }, { scaleX: 1, ease: "power2.inOut", duration: 0.35 })
            .fromTo(row.querySelector(".pain-metric"), { opacity: 1 }, { opacity: 0.6, duration: 0.2 }, "<0.15")
            // штукатурный слой «размазывается» вправо, открывая решение
            .fromTo(row.querySelector(".plaster"), { xPercent: 0 }, { xPercent: 115, ease: "power2.inOut", duration: 1 }, 0.2)
            .fromTo(row.querySelector(".solution"), { x: -40, opacity: 0 }, { x: 0, opacity: 1, ease: "power3.out", duration: 0.7 }, 0.45);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="problems" aria-labelledby="problems-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="01">{t.label}</SectionLabel>
            <RevealText
              as="h2"
              text={t.title}
              className="h2 mt-8"
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="max-w-sm text-lg leading-relaxed text-stone">
              {t.lead}
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 md:mt-28">
          {problems.map((p, i) => (
            <li key={p.title} className="problem-row grid grid-cols-1 gap-8 border-t hairline py-10 md:grid-cols-12 md:gap-6 md:py-14">
              <p className="font-mono text-sm text-terracotta md:col-span-1">0{i + 1}</p>

              <div className="md:col-span-5 md:pr-8">
                <h3 className="font-serif text-[2.1rem] leading-none tracking-[-0.01em] md:text-[2.6rem]">{p.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-stone">{p.pain}</p>
                <div className="mt-8 flex items-end gap-4">
                  <span className="pain-metric relative font-serif text-6xl leading-none text-graphite md:text-7xl">
                    {p.painMetric}
                    <span aria-hidden className="strike absolute top-[55%] -left-[4%] h-[3px] w-[108%] origin-left bg-terracotta" />
                  </span>
                  <span className="eyebrow max-w-[11rem] pb-1 text-[10px] leading-relaxed text-stone">{p.painNote}</span>
                </div>
              </div>

              <div className="relative md:col-span-6">
                <div className="relative isolate h-full overflow-hidden rounded-[1.75rem] border border-graphite/10 bg-paper">
                  <div className="solution relative flex h-full flex-col p-7 md:p-10">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-terracotta text-paper">
                        <Check width={18} height={18} />
                      </span>
                      <span className="eyebrow text-terracotta">{t.how}</span>
                    </div>
                    <h4 className="mt-6 font-serif text-[1.9rem] leading-[1.02] md:text-4xl">{p.solutionTitle}</h4>
                    <p className="mt-3 max-w-md leading-relaxed text-stone">{p.solution}</p>
                    <div className="mt-auto flex items-end gap-4 pt-8">
                      <span className="font-serif text-6xl leading-none text-terracotta md:text-7xl">{p.solutionMetric}</span>
                      <span className="eyebrow max-w-[12rem] pb-1 text-[10px] leading-relaxed text-stone">{p.solutionNote}</span>
                    </div>
                  </div>

                  {/* Штукатурный слой со следами шпателя */}
                  <div aria-hidden className="plaster pointer-events-none absolute inset-0 z-10 hidden bg-sand">
                    <TrowelEdge />
                    <div className="absolute inset-0 opacity-60 [background:repeating-linear-gradient(100deg,transparent_0_38px,rgb(255_255_255/0.35)_38px_40px,transparent_40px_90px)]" />
                    <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "var(--noise)" }} />
                    <span className="eyebrow absolute right-6 bottom-6 text-stone/80">{t.reveal}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
