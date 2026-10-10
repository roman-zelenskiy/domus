"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LeadForm } from "@/components/ui/LeadForm";
import { Close } from "@/components/ui/Icons";
import { EASE } from "@/components/ui/Reveal";
import { useLenis } from "./SmoothScroll";

const ModalContext = createContext<{ open: (source?: string) => void }>({ open: () => {} });

export const useLeadModal = () => useContext(ModalContext);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const lenisRef = useLenis();

  const open = useCallback(
    (src = "modal") => {
      opener.current = document.activeElement as HTMLElement;
      lenisRef?.current?.stop();
      setSource(src);
    },
    [lenisRef],
  );

  const close = useCallback(() => {
    lenisRef?.current?.start();
    setSource(null);
    opener.current?.focus();
  }, [lenisRef]);

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>{source && <Dialog source={source} onClose={close} />}</AnimatePresence>
    </ModalContext.Provider>
  );
}

function Dialog({ source, onClose }: { source: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // На тач-устройствах не открываем клавиатуру сразу — фокусируем сам диалог
    const fine = window.matchMedia("(pointer: fine)").matches;
    const target = fine ? panel.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])") : panel.current;
    target?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      // Простая ловушка фокуса
      const items = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"])',
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" data-lenis-prevent>
      <motion.div
        className="absolute inset-0 bg-graphite/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[2rem] outline-none bg-paper p-6 pb-10 shadow-2xl sm:max-w-xl sm:rounded-[2rem] sm:p-10"
      >
        <div className="blueprint-grid pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-graphite/15 transition-colors hover:bg-graphite hover:text-paper"
        >
          <Close />
        </button>
        <div className="relative">
          <p className="eyebrow text-terracotta">Бесплатно · 40 минут · без обязательств</p>
          <h2 id="lead-modal-title" className="mt-4 font-serif text-[2.6rem] leading-[0.95] tracking-[-0.02em] sm:text-5xl">
            Запишитесь на <span className="accent">замер</span>
          </h2>
          <p className="mt-4 max-w-md text-stone">
            Инженер приедет с лазерным дальномером, осмотрит коммуникации и через 3 дня пришлёт смету, которая не изменится.
          </p>
          <div className="mt-8">
            <LeadForm source={source} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
