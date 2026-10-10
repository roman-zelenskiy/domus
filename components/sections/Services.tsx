"use client";

import Image from "next/image";
import { packages, type PackageId } from "@/content/site";
import { calcStore } from "@/lib/calculator";
import { formatNumber } from "@/lib/format";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight, Check } from "@/components/ui/Icons";

export function Services() {
  const scrollTo = useScrollTo();

  const choose = (id: PackageId) => {
    calcStore.set({ type: id });
    scrollTo("#calculator");
  };

  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden bg-sand/45 py-28 md:py-40">
      <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Услуги и пакеты</SectionLabel>
            <RevealText as="h2" text={"Три пакета —\n*одна* прозрачная смета"} className="h2 mt-8" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-stone">
              Цены указаны за м² и уже включают работы и черновые материалы. Чистовые — по вашему выбору или
              нашей комплектации.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-12 lg:items-start" stagger={0.12}>
          {packages.map((p, i) => {
            const dark = !!p.featured;
            return (
              <StaggerItem key={p.id} className={`lg:col-span-4 ${i === 1 ? "lg:-mt-10" : i === 2 ? "lg:mt-10" : ""}`}>
                <TiltCard
                  tilt={2.5}
                  glow={dark ? "rgb(216 139 105 / 0.28)" : "rgb(216 139 105 / 0.2)"}
                  className={`flex h-full flex-col rounded-[2rem] p-3 ${dark ? "on-dark bg-graphite text-cream" : "border border-graphite/10 bg-paper"}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 80vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 to-transparent" />
                    <span className="eyebrow glass absolute top-3 left-3 rounded-full px-3 py-1.5 text-[10px] text-graphite">
                      {p.term}
                    </span>
                    {dark && (
                      <span className="eyebrow absolute top-3 right-3 rounded-full bg-terracotta px-3 py-1.5 text-[10px] text-paper">
                        Выбирают 64%
                      </span>
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col px-4 pt-7 pb-5 md:px-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-[2.4rem] leading-none tracking-[-0.01em]">{p.name}</h3>
                      <span className={`font-mono text-xs ${dark ? "text-cream/50" : "text-stone"}`}>0{i + 1}</span>
                    </div>
                    <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-cream/70" : "text-stone"}`}>{p.tagline}</p>

                    <p className="mt-7 flex items-baseline gap-2">
                      <span className={`eyebrow ${dark ? "text-cream/50" : "text-stone"}`}>от</span>
                      <span className="font-serif text-5xl leading-none">{formatNumber(p.price)}</span>
                      <span className={`text-sm ${dark ? "text-cream/70" : "text-stone"}`}>₴/м²</span>
                    </p>

                    <ul className={`mt-7 space-y-3 border-t pt-6 text-[15px] ${dark ? "border-cream/10" : "hairline"}`}>
                      {p.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check width={18} height={18} className={`mt-0.5 shrink-0 ${dark ? "text-terracotta-light" : "text-terracotta"}`} />
                          <span className={dark ? "text-cream/85" : "text-graphite/85"}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => choose(p.id)}
                      className={`group/btn mt-8 flex items-center justify-between rounded-full border px-6 py-4 text-[15px] font-semibold transition-colors duration-500 ${
                        dark
                          ? "border-terracotta bg-terracotta text-paper hover:bg-terracotta-light hover:text-graphite"
                          : "border-graphite/15 hover:border-graphite hover:bg-graphite hover:text-paper"
                      }`}
                    >
                      Рассчитать «{p.name.toLowerCase()}»
                      <ArrowRight className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
