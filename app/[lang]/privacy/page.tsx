import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Icons";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { href } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getI18n();
  return {
    title: t.privacy.title,
    description: t.privacy.description,
    alternates: {
      canonical: `${href("/privacy", lang)}/`,
      languages: { uk: "/uk/privacy/", en: "/en/privacy/", "x-default": "/uk/privacy/" },
    },
  };
}

export default async function PrivacyPage() {
  const { lang, site, t } = await getI18n();
  const p = t.privacy;
  return (
    <main id="main" className="container-x max-w-3xl py-16 md:py-24">
      <div className="flex items-center justify-between gap-4">
        <Link href={href("/", lang)} aria-label={t.homeAria} className="inline-block">
          <Logo />
        </Link>
        <LangSwitch />
      </div>
      <p className="eyebrow mt-16 text-terracotta">{p.eyebrow}</p>
      <h1 className="h2 mt-6 break-words hyphens-auto">{p.title}</h1>
      <p className="mt-8 text-lg leading-relaxed text-stone">{p.lead}</p>
      <div className="mt-14 space-y-12">
        {p.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-serif text-3xl leading-tight">{s.h}</h2>
            <p className="mt-4 leading-relaxed text-stone">{s.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-16 border-t hairline pt-8 text-stone">
        {p.contact}{" "}
        <a href={`mailto:${site.company.email}`} className="text-graphite underline underline-offset-4">{site.company.email}</a>
      </p>
      <Link href={href("/", lang)} className="mt-10 inline-flex items-center gap-2 font-semibold text-terracotta">{p.back}</Link>
    </main>
  );
}
