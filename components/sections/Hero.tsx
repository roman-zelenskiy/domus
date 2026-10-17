"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useI18n } from "@/components/providers/I18n";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { useLeadModal } from "@/components/providers/LeadModal";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { EASE } from "@/components/ui/Reveal";
import { Replay, Star } from "@/components/ui/Icons";
import { FloorPlan } from "@/components/visuals/FloorPlan";
import { Seal } from "@/components/visuals/Seal";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);
  const { open } = useLeadModal();
  const { site, t: ui } = useI18n();
  const t = ui.hero;

  // Параллакс слоёв за курсором: фото, чертёж и карточки двигаются с разной глубиной
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const photoX = useTransform(sx, (v) => v * -12);
  const photoY = useTransform(sy, (v) => v * -12);
  const planX = useTransform(sx, (v) => v * 18);
  const planY = useTransform(sy, (v) => v * 18);
  const chipX = useTransform(sx, (v) => v * 26);
  const chipY = useTransform(sy, (v) => v * 26);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        gsap.timeline({ onComplete: () => setDone(true) })
          .set(q(".bp-grid, .hero-photo, .hero-photo-shade, .hero-chip"), { opacity: 1 })
          .set(q(".hero-plan"), { opacity: 0 });
      });

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ delay: 0.5, onComplete: () => setDone(true) });
        tl.fromTo(q(".bp-grid"), { opacity: 0 }, { opacity: 1, duration: 0.8 })
          .to(q(".bp-wall"), { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.1)
          .to(q(".bp-win"), { opacity: 1, duration: 0.5 }, "-=0.4")
          .to(q(".bp-open"), { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.inOut" }, "<")
          .to(q(".bp-dim"), { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, "-=0.3")
          .fromTo(q(".bp-label"), { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.5")
          .to(q(".bp-furn"), { strokeDashoffset: 0, duration: 1.1, stagger: 0.05, ease: "power1.inOut" }, "-=0.2")
          .to(q(".bp-fill"), { opacity: 1, duration: 0.9 }, "-=0.6")
          .addLabel("reveal", "+=0.3")
          // фото «раскатывается» снизу: внешний слой едет вверх, внутренний — навстречу
          .set(q(".hero-photo"), { opacity: 1 }, "reveal")
          .fromTo(q(".hero-reveal-outer"), { yPercent: 100 }, { yPercent: 0, duration: 1.6, ease: "expo.inOut" }, "reveal")
          .fromTo(q(".hero-reveal-inner"), { yPercent: -100 }, { yPercent: 0, duration: 1.6, ease: "expo.inOut" }, "reveal")
          .fromTo(q(".hero-zoom"), { scale: 1.2 }, { scale: 1, duration: 2.6, ease: "expo.out" }, "reveal")
          .to(q(".hero-plan"), { opacity: 0, scale: 1.03, duration: 1.2, ease: "power2.inOut" }, "reveal+=0.7")
          .to(q(".hero-photo-shade"), { opacity: 1, duration: 1 }, "reveal+=1")
          .fromTo(q(".hero-chip"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "reveal+=1.2");
        timeline.current = tl;

        // Лёгкий параллакс фото при скролле
        gsap.to(q(".hero-scroll"), {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          timeline.current = null;
        };
      });
    },
    { scope: root },
  );

  const replay = () => {
    setDone(false);
    timeline.current?.restart(true);
  };

  return (
    <section
      id="top"
      ref={root}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20 lg:min-h-[100svh] lg:pt-[calc(var(--header-h)+2.5rem)]"
    >
      <noscript>
        <style>{`.hero-photo,.hero-photo-shade,.hero-chip{opacity:1!important}.hero-plan{opacity:0!important}`}</style>
      </noscript>

      {/* Тёплые градиентные пятна */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgb(216_139_105/0.28),transparent_65%)]" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(203_187_162/0.55),transparent_65%)]" />
        <div className="blueprint-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative z-10 lg:col-span-6">
          <RevealText
            as="h1"
            immediate
            delay={0.25}
            stagger={0.07}
            text={t.title}
            className="display text-[clamp(3rem,6.6vw,7.4rem)]"
            before={
              <motion.span {...fade(0.1)} className="eyebrow mb-7 flex items-center gap-3 leading-normal text-stone">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pin-pulse rounded-full bg-terracotta" />
                  <span className="relative h-2 w-2 rounded-full bg-terracotta" />
                </span>
                {t.eyebrow}{" "}
              </motion.span>
            }
          />

          {/* Только сдвиг без прозрачности: абзац — LCP-элемент на мобильных */}
          <motion.p initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.9 }} className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-stone md:text-lg">
            {t.leadA} <strong className="font-semibold text-graphite">{t.leadB}</strong> {t.leadC}
          </motion.p>

          <motion.div {...fade(1.05)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => open("hero")}>
              {t.cta}
            </Button>
            <Button size="lg" variant="ghost" href="#calculator">
              {t.calc}
            </Button>
          </motion.div>

          <motion.dl {...fade(1.2)} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t hairline pt-6">
            {t.stats.map(([v, l], i) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="flex items-center gap-1.5 font-serif text-3xl leading-none md:text-[2.4rem]">
                  {v}
                  {i === 2 && <Star width={18} height={18} className="text-terracotta" aria-hidden />}
                </dd>
                <dd aria-hidden className="eyebrow mt-2 text-[10px] text-stone">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Визуал: чертёж → интерьер */}
        <motion.div
          className="relative lg:col-span-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-graphite/10 bg-paper shadow-[0_50px_100px_-50px_rgb(34_32_29/0.45)] lg:max-h-[calc(100svh-var(--header-h)-5rem)] lg:max-w-none">
            <div className="bp-grid blueprint-grid absolute inset-0" style={{ opacity: 0 }} />

            <motion.div style={{ x: photoX, y: photoY }} className="absolute -inset-5">
              <div className="hero-photo hero-reveal-outer absolute inset-0 overflow-hidden" style={{ opacity: 0 }}>
                <div className="hero-reveal-inner absolute inset-0">
                  <div className="hero-scroll absolute inset-x-0 -top-[6%] -bottom-[6%]">
                    <div className="hero-zoom absolute inset-0">
                      <Image
                        src={site.heroImage}
                        alt={t.alt}
                        fill
                        preload
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="hero-photo-shade pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/50 via-graphite/0 to-graphite/10" style={{ opacity: 0 }} />

            <motion.div style={{ x: planX, y: planY }} className="absolute inset-0">
              <div className="hero-plan absolute inset-0 p-[7%] text-graphite">
                <FloorPlan className="h-full w-full" />
              </div>
            </motion.div>

            {/* Статус проекта */}
            <div className="absolute top-4 left-4">
              <div className="glass flex items-center gap-2.5 rounded-full py-2 pr-4 pl-3">
                <span className={`h-2 w-2 rounded-full ${done ? "bg-[#5f8a5a]" : "animate-pulse bg-terracotta"}`} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={done ? "done" : "plan"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="eyebrow text-[10px] text-graphite"
                  >
                    {done ? t.done : t.plan}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence>
              {done && (
                <motion.button
                  type="button"
                  onClick={replay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full text-graphite"
                  aria-label={t.replay}
                  data-cursor={t.replayCursor}
                >
                  <Replay width={16} height={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.div style={{ x: chipX, y: chipY }} className="absolute inset-x-4 bottom-4">
              <div className="hero-chip glass grid grid-cols-2 gap-4 rounded-2xl p-4 sm:p-5" style={{ opacity: 0 }}>
                <div>
                  <p className="eyebrow text-[9px] text-stone">{t.estimate}</p>
                  <p className="mt-1.5 font-serif text-2xl leading-none sm:text-[1.7rem]">{t.sum}</p>
                </div>
                <div className="border-l hairline pl-4">
                  <p className="eyebrow text-[9px] text-stone">{t.final}</p>
                  <p className="mt-1.5 flex items-center gap-2 font-serif text-2xl leading-none sm:text-[1.7rem]">
                    {t.sum}
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-terracotta text-paper">
                      <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden>
                        <path d="m2.5 6.2 2.2 2.2 4.8-4.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <Seal className="absolute -top-8 -right-3 hidden sm:grid lg:top-auto lg:right-auto lg:bottom-32 lg:-left-14" />
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-[10px] text-stone">{t.scroll}</span>
        <span className="relative block h-10 w-px overflow-hidden bg-graphite/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.4s_var(--ease-soft)_infinite] bg-terracotta" />
        </span>
      </div>
    </section>
  );
}
