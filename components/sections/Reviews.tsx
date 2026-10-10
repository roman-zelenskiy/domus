import Image from "next/image";
import { reviews } from "@/content/site";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "@/components/ui/Icons";

type Review = (typeof reviews)[number];

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-graphite/10 bg-paper p-7 sm:w-[400px] md:p-8">
      <div>
        <div className="flex gap-0.5 text-terracotta" role="img" aria-label="Оцінка 5 з 5">
          {Array.from({ length: 5 }, (_, i) => <Star key={i} width={15} height={15} />)}
        </div>
        <blockquote className="mt-5 font-serif text-[1.45rem] leading-[1.25] text-graphite">«{r.text}»</blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-4 border-t hairline pt-6">
        <Image src={r.photo} alt={`Фото: ${r.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-[15px] font-semibold">{r.name}</p>
          <p className="mt-0.5 font-mono text-[11px] text-stone">{r.object}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false, duration }: { items: Review[]; reverse?: boolean; duration: string }) {
  return (
    <div className="group flex overflow-hidden motion-reduce:overflow-x-auto">
      {/* Дублируем ленту для бесшовного цикла; копия скрыта от скринридеров */}
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className="flex shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ "--marquee-duration": duration, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
        >
          {items.map((r) => <ReviewCard key={r.name} r={r} />)}
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-sand/45 py-28 md:py-40">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel index="07">Відгуки</SectionLabel>
          <RevealText as="h2" text={"Нам *довірили* ключі\nпонад 350 родин"} className="h2 mt-8" />
        </div>
        <Reveal className="lg:col-span-4" delay={0.15}>
          <div className="flex items-center gap-5">
            <p className="font-serif text-7xl leading-none">4,9</p>
            <div>
              <div className="flex text-terracotta" role="img" aria-label="5 зірок">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} width={16} height={16} />)}
              </div>
              <p className="mt-2 text-sm text-stone">212 відгуків у Google Maps</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 space-y-4 md:mt-20 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <Row items={reviews.slice(0, half).concat(reviews.slice(half))} duration="80s" />
        <Row items={reviews.slice(half).concat(reviews.slice(0, half))} duration="95s" reverse />
      </div>
    </section>
  );
}
