"use client";

import { motion, type Variants } from "motion/react";
import { EASE } from "./Reveal";

type Token = { word: string; em: boolean };

/** «Ремонт *под ключ*\nи точка» → строки слов; *…* — акцентный курсив */
function tokenize(text: string): Token[][] {
  return text.split("\n").map((line) => {
    let em = false;
    return line
      // тире не должно отрываться от предыдущего слова
      .replace(/ ([—–])/g, "\u00a0$1")
      .split(" ")
      .filter(Boolean)
      .map((raw) => {
        const opens = raw.startsWith("*");
        const closes = raw.endsWith("*") && (raw.length > 1 || !opens);
        if (opens) em = true;
        const token = { word: raw.replace(/\*/g, ""), em };
        if (closes) em = false;
        return token;
      });
  });
}

const container: Variants = {
  hidden: {},
  show: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "112%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.15, ease: EASE } },
};

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Анимировать сразу при монтировании (для hero), а не при попадании в зону видимости */
  immediate?: boolean;
};

/** Заголовок, проявляющийся по словам из-под «маски» строки */
export function RevealText({ text, as: Tag = "h2", className, delay = 0, stagger = 0.055, immediate }: Props) {
  const lines = tokenize(text);
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <motion.span aria-hidden className="block" initial="hidden" custom={{ stagger, delay }} variants={container} {...trigger}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.map((t, wi) => (
              <span key={wi}>
                <span className="-mb-[0.14em] inline-block overflow-hidden pr-[0.06em] pb-[0.14em] align-top">
                  <motion.span variants={word} className={`inline-block origin-bottom-left will-change-transform ${t.em ? "accent" : ""}`}>
                    {t.word}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
