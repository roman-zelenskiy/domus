"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/providers/I18n";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { useLeadModal } from "@/components/providers/LeadModal";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { Logo, Phone, Telegram, Viber, WhatsApp } from "@/components/ui/Icons";
import { EASE } from "@/components/ui/Reveal";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useLeadModal();
  const { site, t } = useI18n();
  const { company, nav } = site;
  const lenisRef = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 640 && y > prev + 2 && !menu);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (menu) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, lenisRef]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container-x pt-3">
          <div className="relative flex h-[60px] items-center justify-between gap-6 rounded-full pr-2 pl-5">
            {/* glass-подложка появляется после начала скролла */}
            <span
              aria-hidden
              className={`glass absolute inset-0 -z-10 rounded-full transition-opacity duration-700 ${scrolled || menu ? "opacity-100" : "opacity-0"}`}
            />
            <a href="#top" aria-label={t.homeAria} className="relative">
              <Logo />
            </a>

            <nav aria-label={t.header.nav} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="group block px-3.5 py-2 text-[14px] font-medium text-graphite/80">
                      <span className="relative block overflow-hidden">
                        <span className="block transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-full">
                          {item.label}
                        </span>
                        <span aria-hidden className="absolute inset-0 block translate-y-full text-terracotta transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-y-0">
                          {item.label}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={company.phoneHref}
                className="hidden items-center gap-2 px-3 font-mono text-[13px] tracking-tight text-graphite/85 transition-colors hover:text-terracotta xl:flex"
              >
                <Phone width={16} height={16} />
                {company.phone}
              </a>
              <LangSwitch />
              <div className="hidden sm:block">
                <Button onClick={() => open("header")}>{t.header.cta}</Button>
              </div>
              <button
                type="button"
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                aria-label={menu ? t.header.closeMenu : t.header.openMenu}
                className="relative grid h-12 w-12 place-items-center rounded-full bg-graphite text-paper lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-500 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-500 ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-cream px-4 pt-28 pb-10 sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.15 } }}
            data-lenis-prevent
          >
            <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label={t.header.mobileNav} className="relative flex-1">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="flex items-baseline gap-4 py-1.5 font-serif text-[2.75rem] leading-none"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.05 * i }}
                    >
                      <span className="font-mono text-xs text-terracotta">0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            >
              <a href={company.phoneHref} className="block font-mono text-lg">{company.phone}</a>
              <div className="flex gap-2">
                {[
                  { href: company.messengers.telegram, label: "Telegram", Icon: Telegram },
                  { href: company.messengers.viber, label: "Viber", Icon: Viber },
                  { href: company.messengers.whatsapp, label: "WhatsApp", Icon: WhatsApp },
                ].map(({ href, label, Icon }) => (
                  <a key={label} href={href} aria-label={label} className="grid h-12 w-12 place-items-center rounded-full border border-graphite/15">
                    <Icon />
                  </a>
                ))}
              </div>
              <Button
                onClick={() => {
                  setMenu(false);
                  open("mobile-menu");
                }}
                className="w-full justify-between"
                size="lg"
                magnetic={false}
              >
                {t.header.mobileCta}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
