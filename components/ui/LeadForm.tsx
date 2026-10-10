"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, useSyncExternalStore } from "react";
import { contactTimes } from "@/content/site";
import { formatPhone, isValidPhone, phoneDigits } from "@/lib/format";
import { lastLead, leadsStore, submitLead } from "@/lib/leads";
import { EASE } from "./Reveal";
import { Button } from "./Button";

type Status = "idle" | "loading" | "success";
type Errors = Partial<Record<"name" | "phone", string>>;

function validate(name: string, phone: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Как к вам обращаться? Минимум 2 буквы";
  else if (!/^[\p{L}\s'’-]+$/u.test(name.trim())) errors.name = "Только буквы, пожалуйста";
  if (!phone) errors.phone = "Укажите номер, чтобы мы могли перезвонить";
  else if (!isValidPhone(phone)) errors.phone = "Номер неполный: +380 (XX) XXX-XX-XX";
  return errors;
}

export function LeadForm({ tone = "light", source = "form" }: { tone?: "light" | "dark"; source?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState(contactTimes[1]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // Заявка, оставленная раньше в этом браузере (демо-хранилище в localStorage)
  const previous = lastLead(useSyncExternalStore(leadsStore.subscribe, leadsStore.getSnapshot, leadsStore.getServerSnapshot));

  const errors = validate(name, phone);
  const show = (f: keyof Errors) => (touched[f] || submitted) && errors[f];
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      const first = e.currentTarget.querySelector<HTMLInputElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("loading");
    await submitLead({ name: name.trim(), phone: phoneDigits(phone), time, source });
    setStatus("success");
  }

  const reset = () => {
    setName("");
    setPhone("");
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  const label = `eyebrow block mb-3 ${dark ? "text-cream/55" : "text-stone"}`;
  const input = `w-full border-b bg-transparent pb-3 font-serif text-[1.75rem] leading-tight outline-none transition-colors duration-300 placeholder:opacity-35 focus-visible:outline-none ${
    dark ? "border-cream/20 text-cream focus:border-terracotta-light" : "border-graphite/20 text-graphite focus:border-terracotta"
  }`;
  const errCls = `mt-2 text-sm ${dark ? "text-terracotta-light" : "text-terracotta"}`;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="py-6 text-center sm:py-10"
            role="status"
            aria-live="polite"
          >
            <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden>
              <motion.circle
                cx="40" cy="40" r="37" fill="none" strokeWidth="1.5"
                className={dark ? "stroke-terracotta-light" : "stroke-terracotta"}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }}
              />
              <motion.path
                d="m26 41 9 9 19-20" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={dark ? "stroke-cream" : "stroke-graphite"}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              />
            </svg>
            <p className="mt-6 font-serif text-4xl leading-tight">
              Спасибо, {name.trim().split(" ")[0]}!
            </p>
            <p className={`mx-auto mt-3 max-w-sm ${dark ? "text-cream/70" : "text-stone"}`}>
              Инженер перезвонит в течение 15 минут в рабочее время, чтобы договориться о замере.
            </p>
            <button type="button" onClick={reset} className={`eyebrow mt-8 underline underline-offset-4 ${dark ? "text-cream/60" : "text-stone"}`}>
              Отправить ещё одну заявку
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="space-y-8"
          >
            {previous && (
              <p className={`rounded-2xl px-4 py-3 text-sm ${dark ? "bg-cream/5 text-cream/70" : "bg-sand/60 text-stone"}`}>
                {previous.name}, вы уже оставляли заявку{" "}
                {new Date(previous.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}. Если
                что-то изменилось — отправьте ещё одну.
              </p>
            )}

            <div>
              <label htmlFor={`${uid}-name`} className={label}>Ваше имя</label>
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="given-name"
                placeholder="Анна"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                aria-invalid={!!show("name")}
                aria-describedby={show("name") ? `${uid}-name-err` : undefined}
                className={input}
              />
              {show("name") && <p id={`${uid}-name-err`} className={errCls}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor={`${uid}-phone`} className={label}>Телефон</label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+380 (__) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onFocus={() => !phone && setPhone("+380 (")}
                onBlur={() => {
                  if (phone === "+380 (") setPhone("");
                  setTouched((t) => ({ ...t, phone: true }));
                }}
                aria-invalid={!!show("phone")}
                aria-describedby={show("phone") ? `${uid}-phone-err` : undefined}
                className={`${input} tabular-nums`}
              />
              {show("phone") && <p id={`${uid}-phone-err`} className={errCls}>{errors.phone}</p>}
            </div>

            <fieldset>
              <legend className={label}>Когда удобно созвониться</legend>
              <div className="flex flex-wrap gap-2">
                {contactTimes.map((t) => {
                  const active = t === time;
                  return (
                    <label
                      key={t}
                      className={`relative cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
                        active
                          ? dark ? "border-terracotta-light bg-terracotta-light text-graphite" : "border-graphite bg-graphite text-paper"
                          : dark ? "border-cream/20 text-cream/80 hover:border-cream/50" : "border-graphite/20 text-graphite/80 hover:border-graphite/50"
                      }`}
                    >
                      <input type="radio" name="time" value={t} checked={active} onChange={() => setTime(t)} className="sr-only" />
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-5 pt-2 xl:flex-row xl:items-center xl:justify-between">
              <Button type="submit" className="shrink-0" variant={dark ? "light" : "primary"} size="lg" disabled={status === "loading"} aria-busy={status === "loading"} magnetic={false}>
                <span className="inline-flex items-center gap-3">
                  {status === "loading" && (
                    <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  )}
                  {status === "loading" ? "Отправляем…" : "Записаться на замер"}
                </span>
              </Button>
              <p className={`max-w-[16rem] text-xs leading-relaxed ${dark ? "text-cream/50" : "text-stone"}`}>
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy" className="underline underline-offset-2">политикой конфиденциальности</Link>
              </p>
            </div>

          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
