"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { stats, unsplash } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { RevealText } from "@/components/ui/RevealText";
import { EASE, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { Star } from "@/components/ui/Icons";

const crew = [
  { role: "Маляры-штукатуры", n: 11 },
  { role: "Плиточники", n: 9 },
  { role: "Монтажники ГКЛ", n: 8 },
  { role: "Электрики", n: 6 },
  { role: "Сантехники", n: 5 },
  { role: "Столяры", n: 3 },
];

const tile = "h-full rounded-[1.75rem] p-6 md:p-8";
const label = "eyebrow text-[10px]";

export function Stats() {
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="max-w-3xl">
          <SectionLabel index="06">Цифры</SectionLabel>
          <RevealText as="h2" text={"Цифры, за которые\nмы *отвечаем*"} className="h2 mt-8" />
        </div>

        <Stagger className="mt-16 grid auto-rows-[minmax(190px,auto)] grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4" stagger={0.08}>
          {/* 350+ объектов */}
          <StaggerItem className="col-span-2 row-span-2">
            <TiltCard tilt={1.5} className={`${tile} on-dark relative flex min-h-[420px] flex-col justify-between bg-graphite text-cream`}>
              <Image
                src={unsplash("1600210492486-724fe5c67fb0", 1400)}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-10 object-cover opacity-45 transition-transform duration-[1.6s] ease-[var(--ease-premium)] group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/20" />
              <p className={`${label} text-cream/60`}>Сдано под ключ с 2018 года</p>
              <div>
                <p className="font-serif text-[clamp(6rem,14vw,13rem)] leading-[0.82] tracking-[-0.03em]">
                  <Counter to={stats.objects} />
                  <span className="text-terracotta-light">+</span>
                </p>
                <p className="mt-4 max-w-sm text-cream/70">
                  квартир в Киеве — от однушек на Позняках до пентхаусов на Печерске.
                </p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* 97% в срок */}
          <StaggerItem>
            <TiltCard className={`${tile} flex flex-col justify-between border border-graphite/10 bg-paper`}>
              <div className="flex items-start justify-between">
                <p className={`${label} text-stone`}>Точно в срок</p>
                <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden>
                  <circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="3" />
                  <motion.circle
                    cx="22" cy="22" r="19" fill="none" stroke="var(--color-terracotta)" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: stats.onTime / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
                  />
                </svg>
              </div>
              <div>
                <p className="font-serif text-7xl leading-none"><Counter to={stats.onTime} suffix="%" /></p>
                <p className="mt-2 text-sm text-stone">объектов сданы в дату из договора</p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* 3 года гарантии */}
          <StaggerItem>
            <TiltCard glow="rgb(255 255 255 / 0.18)" className={`${tile} on-dark flex flex-col justify-between bg-terracotta text-paper`}>
              <p className={`${label} text-paper/70`}>Гарантия</p>
              <div>
                <p className="font-serif text-7xl leading-none"><Counter to={stats.warranty} /> <span className="text-4xl">года</span></p>
                <p className="mt-2 text-sm text-paper/80">на все работы — прописана в договоре</p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* 0 ₴ доплат */}
          <StaggerItem>
            <TiltCard className={`${tile} on-dark flex flex-col justify-between bg-graphite-2 text-cream`}>
              <p className={`${label} text-cream/55`}>Доплаты сверх сметы</p>
              <div>
                <p className="font-serif text-7xl leading-none">0 <span className="text-terracotta-light">₴</span></p>
                <p className="mt-2 text-sm text-cream/65">с 2021 года, когда мы перешли на фиксированные сметы</p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* Рейтинг */}
          <StaggerItem>
            <TiltCard className={`${tile} flex flex-col justify-between border border-graphite/10 bg-paper`}>
              <div className="flex items-center justify-between">
                <p className={`${label} text-stone`}>Google Maps</p>
                <div className="flex text-terracotta" aria-label="5 звёзд">
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} width={14} height={14} />)}
                </div>
              </div>
              <div>
                <p className="font-serif text-7xl leading-none"><Counter to={stats.rating} decimals={1} /></p>
                <p className="mt-2 text-sm text-stone">средняя оценка по {stats.reviews} отзывам</p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* Мастера в штате */}
          <StaggerItem className="col-span-2">
            <TiltCard className={`${tile} grid gap-6 bg-sand sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10`}>
              <div>
                <p className={`${label} text-stone`}>Свои мастера</p>
                <p className="mt-4 font-serif text-7xl leading-none md:text-8xl"><Counter to={stats.masters} /></p>
                <p className="mt-2 max-w-[13rem] text-sm text-stone">специалиста в штате — без случайных субподрядчиков</p>
              </div>
              <ul className="space-y-2.5">
                {crew.map((c, i) => (
                  <li key={c.role} className="grid grid-cols-[8.5rem_1fr_1.5rem] items-center gap-3 text-xs">
                    <span className="truncate text-graphite/75">{c.role}</span>
                    <span className="relative h-1.5 overflow-hidden rounded-full bg-graphite/10">
                      <motion.span
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-graphite"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: c.n / 11 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: EASE, delay: 0.3 + i * 0.08 }}
                      />
                    </span>
                    <span className="text-right font-mono text-graphite">{c.n}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </StaggerItem>

          {/* 8 лет */}
          <StaggerItem>
            <TiltCard className={`${tile} flex flex-col justify-between border border-graphite/10 bg-paper`}>
              <p className={`${label} text-stone`}>На рынке</p>
              <div>
                <p className="font-serif text-7xl leading-none"><Counter to={stats.years} /> <span className="text-4xl">лет</span></p>
                <p className="mt-2 text-sm text-stone">работаем только в Киеве и пригороде</p>
              </div>
            </TiltCard>
          </StaggerItem>

          {/* Чек-лист */}
          <StaggerItem>
            <TiltCard className={`${tile} relative flex flex-col justify-between border border-graphite/10 bg-paper`}>
              <div aria-hidden className="blueprint-grid absolute inset-0 -z-10 opacity-80" />
              <p className={`${label} text-stone`}>Технадзор</p>
              <div>
                <p className="font-serif text-7xl leading-none"><Counter to={stats.checklist} /></p>
                <p className="mt-2 text-sm text-stone">пунктов в чек-листе приёмки каждого этапа</p>
              </div>
            </TiltCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
