"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/components/providers/I18n";
import { RevealText } from "@/components/ui/RevealText";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Подпись основателя, которая «пишется» при появлении */
function Signature() {
  return (
    <svg viewBox="0 0 220 70" className="h-14 w-44 text-graphite" aria-hidden>
      <motion.path
        d="M8 46c10-18 22-34 30-30 7 4-8 30-2 32 6 2 14-26 22-24 6 2-2 20 4 21 7 1 12-16 19-15 5 1 0 12 5 13 6 1 10-10 16-9 4 1 2 8 6 8 8 0 14-14 22-12 6 2-2 12 4 12 10 0 24-12 40-10 12 2 22 6 38 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
      />
    </svg>
  );
}

export function Team() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { site, t: ui } = useI18n();
  const { aboutImage, team } = site;
  const t = ui.team;
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel index="08">{t.label}</SectionLabel>
            <RevealText as="h2" text={t.title} className="h2 mt-8" />
            <Reveal delay={0.1}>
              <div className="mt-8 max-w-md space-y-5 text-lg leading-relaxed text-stone">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <figure className="mt-12 border-l-2 border-terracotta pl-6">
                <blockquote className="font-serif text-[1.65rem] leading-[1.2] italic">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-4">
                  <Signature />
                  <span className="text-sm text-stone">
                    {t.author}
                    <br />
                    {t.authorRole}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div ref={imgWrap} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand lg:aspect-[5/6]">
                <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                  <Image
                    src={aboutImage}
                    alt={t.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="glass absolute right-4 bottom-4 left-4 flex items-center justify-between gap-4 rounded-2xl p-5 sm:right-auto sm:max-w-xs">
                  <div>
                    <p className="eyebrow text-[10px] text-stone">{t.dept}</p>
                    <p className="mt-1.5 font-serif text-2xl leading-tight">{t.deptText}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-24 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-32 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-sand">
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 48vw"
                    className="object-cover saturate-[0.8] transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <p className="absolute inset-x-4 bottom-4 translate-y-3 text-sm leading-snug text-paper opacity-0 transition-all duration-700 ease-[var(--ease-premium)] group-hover:translate-y-0 group-hover:opacity-100">
                    {m.note}
                  </p>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-none md:text-[1.75rem]">{m.name}</h3>
                <p className="mt-2 text-sm text-stone">{m.role}</p>
                <p className="mt-2 text-sm text-stone lg:hidden">{m.note}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
