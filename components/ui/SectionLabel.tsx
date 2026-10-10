/** Подпись секции в «чертёжном» стиле: 03 —— Услуги */
export function SectionLabel({ index, children, dark = false }: { index: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? "text-cream/60" : "text-stone"}`}>
      <span className={dark ? "text-terracotta-light" : "text-terracotta"}>{index}</span>
      <span aria-hidden className={`h-px w-10 ${dark ? "bg-cream/25" : "bg-graphite/25"}`} />
      <span>{children}</span>
    </p>
  );
}
