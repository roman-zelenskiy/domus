import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/site";
import { Logo } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Як Domus збирає, зберігає та використовує персональні дані клієнтів.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "1. Які дані ми збираємо",
    p: "Ім’я, номер телефону та зручний час для дзвінка, які ви залишаєте у формі заявки. Також ми автоматично отримуємо знеособлені технічні дані: тип пристрою, браузер і сторінки, які ви відвідали.",
  },
  {
    h: "2. Навіщо вони нам потрібні",
    p: "Лише щоб зв’язатися з вами, домовитися про замір, підготувати кошторис і виконати договір. Ми не використовуємо ваші контакти для масових розсилок і не передаємо їх третім особам, крім випадків, передбачених законодавством України.",
  },
  {
    h: "3. Як ми зберігаємо дані",
    p: "Заявки зберігаються в захищеній CRM-системі з обмеженим доступом працівників. Якщо договір не було укладено, дані видаляються через 12 місяців після останнього контакту.",
  },
  {
    h: "4. Ваші права",
    p: "Ви можете будь-коли запросити, змінити або видалити свої дані, написавши нам на пошту. Ми відповімо протягом 10 робочих днів відповідно до Закону України «Про захист персональних даних».",
  },
  {
    h: "5. Cookies",
    p: "Сайт використовує технічні cookies, необхідні для роботи, та аналітичні cookies для покращення сервісу. Ви можете вимкнути їх у налаштуваннях браузера.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" className="container-x max-w-3xl py-16 md:py-24">
      <Link href="/" aria-label="Domus — на головну" className="inline-block">
        <Logo />
      </Link>
      <p className="eyebrow mt-16 text-terracotta">Документ · редакція від 1 вересня 2026</p>
      <h1 className="h2 mt-6">Політика конфіденційності</h1>
      <p className="mt-8 text-lg leading-relaxed text-stone">
        Ця політика описує, як компанія Domus обробляє персональні дані відвідувачів сайту та клієнтів.
        Залишаючи заявку, ви погоджуєтеся з її умовами.
      </p>
      <div className="mt-14 space-y-12">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-serif text-3xl leading-tight">{s.h}</h2>
            <p className="mt-4 leading-relaxed text-stone">{s.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-16 border-t hairline pt-8 text-stone">
        Питання щодо обробки даних:{" "}
        <a href={`mailto:${company.email}`} className="text-graphite underline underline-offset-4">{company.email}</a>
      </p>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 font-semibold text-terracotta">← Повернутися на головну</Link>
    </main>
  );
}
