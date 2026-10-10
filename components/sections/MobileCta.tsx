"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { company } from "@/content/site";
import { useLeadModal } from "@/components/providers/LeadModal";
import { Phone, Telegram } from "@/components/ui/Icons";
import { EASE } from "@/components/ui/Reveal";

/** Липкая панель заявки на мобильных: появляется после hero и прячется у финальной формы */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [nearForm, setNearForm] = useState(false);
  const { open } = useLeadModal();

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.8));

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setNearForm(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !nearForm;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
          initial={{ y: "140%" }}
          animate={{ y: "0%" }}
          exit={{ y: "140%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="glass flex items-center gap-2 rounded-full p-1.5 pl-1.5">
            <button
              type="button"
              onClick={() => open("mobile-sticky")}
              className="h-12 flex-1 rounded-full bg-terracotta px-5 text-[15px] font-semibold text-paper"
            >
              Бесплатный замер
            </button>
            <a href={company.messengers.telegram} aria-label="Написать в Telegram" className="grid h-12 w-12 place-items-center rounded-full bg-paper text-graphite">
              <Telegram />
            </a>
            <a href={company.phoneHref} aria-label={`Позвонить ${company.phone}`} className="grid h-12 w-12 place-items-center rounded-full bg-graphite text-paper">
              <Phone />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
