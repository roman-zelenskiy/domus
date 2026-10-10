import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="blueprint-grid relative flex min-h-[100svh] flex-col">
      <div className="container-x pt-8">
        <Link href="/" aria-label="Domus — на головну">
          <Logo />
        </Link>
      </div>
      <div className="container-x flex flex-1 flex-col justify-center py-20">
        <p className="eyebrow text-terracotta">Помилка 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">
          Цієї кімнати <span className="accent">немає в плані</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-stone">
          Сторінка переїхала або ніколи не існувала. Поверніться на головну — там калькулятор, проєкти та запис на
          безкоштовний замір.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-terracotta px-7 py-4 font-semibold text-paper transition-colors hover:bg-graphite"
        >
          На головну →
        </Link>
      </div>
    </main>
  );
}
