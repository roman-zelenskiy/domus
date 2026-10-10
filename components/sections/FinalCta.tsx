import { company } from "@/content/site";
import { LeadForm } from "@/components/ui/LeadForm";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const perks = [
  ["40 минут", "Лазерный обмер, проверка стен, полов и коммуникаций"],
  ["3 дня", "Смета на 200+ позиций и график работ по дням"],
  ["0 ₴", "Замер бесплатный и ни к чему не обязывает"],
];

export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark relative overflow-hidden bg-graphite py-28 text-cream md:py-40">
      <div aria-hidden className="blueprint-grid-dark pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-60 -left-40 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgb(169_78_52/0.35),transparent_62%)]" />
      <div aria-hidden className="pointer-events-none absolute right-[-20%] bottom-[-30%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(216_139_105/0.14),transparent_65%)]" />

      <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel index="10" dark>
            Заявка
          </SectionLabel>
          <RevealText
            as="h2"
            text={"Бесплатный замер\nи смета, которая\n*не изменится*"}
            className="h2 mt-8"
          />

          <Stagger as="ul" className="mt-14 space-y-0 border-t border-cream/10" stagger={0.1}>
            {perks.map(([v, t]) => (
              <StaggerItem as="li" key={v} className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 sm:grid-cols-[10rem_1fr] sm:gap-6 border-b border-cream/10 py-6">
                <span className="font-serif text-3xl leading-none whitespace-nowrap text-terracotta-light sm:text-4xl">{v}</span>
                <span className="text-cream/70">{t}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <p className="mt-10 text-cream/60">
              Удобнее позвонить?{" "}
              <a href={company.phoneHref} className="font-mono text-cream underline decoration-terracotta-light underline-offset-4 hover:text-terracotta-light">
                {company.phone}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <div className="glass-dark rounded-[2rem] p-6 sm:p-10">
            <p className="font-serif text-3xl leading-tight">Запишитесь на замер</p>
            <p className="mt-2 text-sm text-cream/60">Перезвоним в течение 15 минут и подберём время.</p>
            <div className="mt-10">
              <LeadForm tone="dark" source="final-cta" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
