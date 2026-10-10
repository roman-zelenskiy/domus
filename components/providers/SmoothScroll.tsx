"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, REDUCED } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

const HEADER_OFFSET = -80;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(REDUCED).matches;
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, touchMultiplier: 1.2 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Плавные якорные ссылки по всему сайту
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href")!;
      const target = hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.6 });
      else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Прокрутка к секции с учётом Lenis */
export function useScrollTo() {
  const lenisRef = useLenis();
  return useCallback(
    (selector: string) => {
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) return;
      const lenis = lenisRef?.current;
      if (lenis) lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.6 });
      else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
    },
    [lenisRef],
  );
}
