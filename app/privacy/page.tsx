import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/site";
import { Logo } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как Domus собирает, хранит и использует персональные данные клиентов.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "1. Какие данные мы собираем",
    p: "Имя, номер телефона и удобное время для звонка, которые вы оставляете в форме заявки. Также мы автоматически получаем обезличенные технические данные: тип устройства, браузер и страницы, которые вы посетили.",
  },
  {
    h: "2. Зачем они нам нужны",
    p: "Только чтобы связаться с вами, договориться о замере, подготовить смету и выполнить договор. Мы не используем ваши контакты для массовых рассылок и не передаём их третьим лицам, кроме случаев, предусмотренных законодательством Украины.",
  },
  {
    h: "3. Как мы храним данные",
    p: "Заявки хранятся в защищённой CRM-системе с ограниченным доступом сотрудников. Если договор не был заключён, данные удаляются через 12 месяцев после последнего контакта.",
  },
  {
    h: "4. Ваши права",
    p: "Вы можете в любой момент запросить, изменить или удалить свои данные, написав нам на почту. Мы ответим в течение 10 рабочих дней.",
  },
  {
    h: "5. Cookies",
    p: "Сайт использует технические cookies, необходимые для работы, и аналитические cookies для улучшения сервиса. Вы можете отключить их в настройках браузера.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" className="container-x max-w-3xl py-16 md:py-24">
      <Link href="/" aria-label="Domus — на главную" className="inline-block">
        <Logo />
      </Link>
      <p className="eyebrow mt-16 text-terracotta">Документ · редакция от 1 сентября 2026</p>
      <h1 className="h2 mt-6">Политика конфиденциальности</h1>
      <p className="mt-8 text-lg leading-relaxed text-stone">
        Эта политика описывает, как компания Domus обрабатывает персональные данные посетителей сайта и клиентов.
        Оставляя заявку, вы соглашаетесь с её условиями.
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
        Вопросы по обработке данных:{" "}
        <a href={`mailto:${company.email}`} className="text-graphite underline underline-offset-4">{company.email}</a>
      </p>
      <Link href="/" className="mt-10 inline-flex items-center gap-2 font-semibold text-terracotta">← Вернуться на главную</Link>
    </main>
  );
}
