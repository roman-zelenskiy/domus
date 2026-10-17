import { Logo } from "@/components/ui/Icons";
import { detectScript } from "@/lib/i18n";

/** Скрипт переводить на /uk/ або /en/ до першої відмальовки; без JS лишаються посилання */
export default function LangRoot() {
  return (
    <main className="blueprint-grid grid min-h-[100svh] place-content-center gap-8 px-4 text-center">
      <script dangerouslySetInnerHTML={{ __html: detectScript }} />
      <div className="mx-auto"><Logo /></div>
      <p className="flex flex-wrap justify-center gap-3">
        <a href="uk/" lang="uk" className="rounded-full bg-terracotta px-7 py-4 font-semibold text-paper">Українською</a>
        <a href="en/" lang="en" className="rounded-full border border-graphite/20 px-7 py-4 font-semibold">English</a>
      </p>
    </main>
  );
}
