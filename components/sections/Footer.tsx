import Link from "next/link";
import { company, nav } from "@/content/site";
import { ArrowUpRight, Facebook, Instagram, Logo, Telegram, Viber, WhatsApp, YouTube } from "@/components/ui/Icons";
import { DistrictMap } from "@/components/visuals/DistrictMap";

const messengers = [
  { href: company.messengers.telegram, label: "Telegram", Icon: Telegram },
  { href: company.messengers.viber, label: "Viber", Icon: Viber },
  { href: company.messengers.whatsapp, label: "WhatsApp", Icon: WhatsApp },
];

const socials = [
  { href: company.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: company.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: company.socials.youtube, label: "YouTube", Icon: YouTube },
];

const heading = "eyebrow text-cream/45";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden border-t border-cream/10 bg-graphite pt-20 pb-28 text-cream lg:pb-10">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Ремонт квартир под ключ в Киеве с фиксированной сметой и гарантией 3 года.
            </p>
            <div className="mt-8 flex gap-2">
              {messengers.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Написать в ${label}`}
                  className="grid h-12 w-12 place-items-center rounded-full border border-cream/15 transition-colors duration-300 hover:border-terracotta-light hover:bg-terracotta-light hover:text-graphite"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <address className="not-italic lg:col-span-3">
            <p className={heading}>Контакты</p>
            <ul className="mt-6 space-y-3 text-[15px]">
              <li>
                <a href={company.phoneHref} className="font-serif text-3xl leading-none hover:text-terracotta-light">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="text-cream/75 hover:text-cream">{company.email}</a>
              </li>
              <li className="text-cream/75">
                {company.address}
                <br />
                {company.city}
              </li>
              <li className="text-cream/50">{company.hours}</li>
            </ul>
          </address>

          <nav aria-label="Навигация в подвале" className="lg:col-span-2">
            <p className={heading}>Разделы</p>
            <ul className="mt-6 space-y-2.5 text-[15px] text-cream/75">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-cream">{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#about" className="hover:text-cream">О компании</a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-4">
            <p className={heading}>Как добраться</p>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-6 block overflow-hidden rounded-[1.5rem] border border-cream/10"
              data-cursor="Маршрут"
            >
              <DistrictMap className="block h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.04]" />
              <span className="glass-dark absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
                Открыть в Google Maps <ArrowUpRight width={14} height={14} />
              </span>
            </a>
          </div>
        </div>

        <p aria-hidden className="pointer-events-none mt-20 font-serif text-[27vw] leading-[0.75] tracking-[-0.04em] text-cream/[0.06] select-none lg:text-[22vw]">
          Domus
        </p>

        <div className="mt-6 flex flex-col gap-6 border-t border-cream/10 pt-8 text-sm text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>© 2018–2026 Domus. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cream">Политика конфиденциальности</Link>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} aria-label={label} className="text-cream/60 transition-colors hover:text-terracotta-light">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
