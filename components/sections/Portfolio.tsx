"use client";

import Image from "next/image";
import { useRef } from "react";
import { beforeAfter, projects } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLeadModal } from "@/components/providers/LeadModal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Деления строительной рулетки: каждые 10 — длинная риска, каждые 50 — подпись */
function TapeTicks() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full text-graphite" preserveAspectRatio="none">
      <defs>
        <pattern id="tape-ticks" width="12" height="28" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="7" stroke="currentColor" strokeOpacity=".35" />
        </pattern>
        <pattern id="tape-ticks-lg" width="60" height="28" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="13" stroke="currentColor" strokeOpacity=".6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tape-ticks)" />
      <rect width="100%" height="100%" fill="url(#tape-ticks-lg)" />
    </svg>
  );
}

export function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const { open } = useLeadModal();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const pin = q(".pf-pin")[0] as HTMLElement;
      const track = q(".pf-track")[0] as HTMLElement;
      const counter = q(".pf-counter")[0] as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const caseX = gsap.quickSetter(q(".pf-case"), "x", "px");
        const tapeW = () => (q(".pf-tape")[0] as HTMLElement).offsetWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              caseX(self.progress * tapeW());
              const idx = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
              counter.textContent = `0${idx}`;
            },
          },
        });

        gsap.fromTo(q(".pf-tape-fill"), { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: 0.8, invalidateOnRefresh: true },
        });

        // Внутренний параллакс фото относительно горизонтального движения
        q(".pf-img").forEach((img) => {
          gsap.fromTo(img, { xPercent: -7 }, {
            xPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" aria-labelledby="projects-title" className="relative bg-cream pt-28 md:pt-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="05">Портфолио</SectionLabel>
            <RevealText as="h2" text={"Квартиры, в которые\n*хочется* возвращаться"} className="h2 mt-8" />
          </div>
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="text-lg leading-relaxed text-stone">
              350+ объектов за 8 лет. Здесь — шесть, которыми мы особенно гордимся: от однушки под сдачу до
              сталинки на Печерске.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="pf-pin relative mt-14 lg:mt-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div
          className="pf-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-8 lg:snap-none lg:gap-6 lg:overflow-visible lg:px-14 lg:pb-0 xl:px-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))]"
          data-lenis-prevent-touch
        >
          {projects.map((p, i) => (
            <article key={p.title} className="w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-[40vw] xl:w-[36vw]" data-cursor="Смотреть">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand lg:aspect-auto lg:h-[58svh]">
                <div className="pf-img absolute inset-y-0 -left-[9%] w-[118%]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 82vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-transparent to-transparent" />
                <span className="eyebrow glass absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] text-graphite">{p.type}</span>
                <span className="glass absolute top-4 right-4 rounded-full px-3 py-1.5 font-mono text-[11px] text-graphite">№ 0{i + 1}</span>
                <dl className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 text-paper">
                  {[
                    ["Площадь", `${p.area} м²`],
                    ["Срок", `${p.days} дн.`],
                    ["Бюджет", p.budget],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-graphite/35 p-3 backdrop-blur-md">
                      <dt className="eyebrow text-[9px] text-paper/60">{k}</dt>
                      <dd className="mt-1 font-serif text-xl leading-none">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <h3 className="mt-5 font-serif text-3xl leading-none">{p.title}</h3>
              <p className="mt-2 font-mono text-xs text-stone">{p.place}</p>
            </article>
          ))}

          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center rounded-[1.75rem] border border-dashed border-graphite/25 p-8 sm:w-[58vw] lg:h-[58svh] lg:w-[30vw]">
            <p className="eyebrow text-terracotta">№ 07</p>
            <p className="mt-5 font-serif text-[2.6rem] leading-[0.98]">
              Ваша квартира может быть <span className="accent">следующей</span>
            </p>
            <p className="mt-4 max-w-xs text-stone">Покажем ещё 20+ объектов в вашем районе на встрече после замера.</p>
            <div className="mt-8">
              <Button onClick={() => open("portfolio")}>Обсудить проект</Button>
            </div>
          </div>
        </div>

        {/* Рулетка: лента вытягивается по мере прокрутки */}
        <div className="container-x mt-10 hidden lg:block" aria-hidden>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-stone">
              <span className="pf-counter text-graphite">01</span> / 0{projects.length}
            </p>
            <div className="pf-tape relative h-7 flex-1">
              <div className="absolute inset-x-0 top-0 h-full rounded-sm bg-graphite/[0.04]">
                <TapeTicks />
              </div>
              <div className="pf-tape-fill absolute inset-x-0 top-0 h-[3px] origin-left bg-terracotta" />
              <div className="pf-case absolute top-1/2 left-0 -mt-[18px] -ml-[18px]">
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <rect x="1" y="1" width="34" height="34" rx="9" fill="var(--color-graphite)" />
                  <circle cx="18" cy="18" r="9" fill="none" stroke="var(--color-terracotta-light)" strokeWidth="1.5" />
                  <circle cx="18" cy="18" r="2.5" fill="var(--color-terracotta-light)" />
                </svg>
              </div>
            </div>
            <p className="font-mono text-xs text-stone">листайте →</p>
          </div>
        </div>
      </div>

      {/* До / после */}
      <div className="container-x grid gap-10 py-28 md:py-36 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <p className="eyebrow text-terracotta">До / После</p>
          <h3 className="mt-6 font-serif text-[2.8rem] leading-[0.95] md:text-6xl">{beforeAfter.title}</h3>
          <p className="mt-5 font-mono text-xs leading-relaxed text-stone">{beforeAfter.meta}</p>
          <p className="mt-6 max-w-sm leading-relaxed text-stone">
            Потяните шторку: слева — квартира в день замера, справа — в день сдачи. Стены, проводка, полы и
            перепланировка — за 118 дней по фиксированной смете.
          </p>
        </div>
        <Reveal className="lg:col-span-8">
          <BeforeAfter
            before={beforeAfter.before}
            after={beforeAfter.after}
            beforeAlt={beforeAfter.beforeAlt}
            afterAlt={beforeAfter.afterAlt}
            className="aspect-[4/5] sm:aspect-[16/10]"
          />
        </Reveal>
      </div>
    </section>
  );
}
