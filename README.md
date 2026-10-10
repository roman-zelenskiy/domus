# Domus — лендинг ремонта квартир под ключ (Киев)

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Структура

- `app/` — страница, layout (шрифты, SEO, JSON-LD), OG-картинка, robots, sitemap, `/privacy`
- `components/sections/` — 13 секций лендинга
- `components/ui/` — Button, Magnetic, RevealText, Reveal/Stagger, Counter, Odometer, TiltCard, BeforeAfter, LeadForm
- `components/visuals/` — FloorPlan (чертёж для hero), Room3D (R3F), RoomIso (SVG-фолбэк), DistrictMap, Seal
- `components/providers/` — Lenis + GSAP, модалка заявки, кастомный курсор
- `content/site.ts` — все тексты, цены, фото, контакты
- `lib/` — калькулятор, маска телефона, фейковое хранилище заявок (`leads.ts`), хуки

## Деплой на GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml` — на каждый push в `main` проверяет типы и линтер,
собирает статический экспорт и публикует его.

1. Запушьте репозиторий на GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Сайт появится по адресу `https://<username>.github.io/<repo>/`.

Сайт полностью статический. Форма заявки фейковая: имитирует отправку и сохраняет заявку
в `localStorage` браузера (ключ `domus:leads`). При повторном визите форма напоминает о прошлой заявке.

При сборке для Pages (`GITHUB_PAGES=true`) включается статический экспорт с `basePath`,
а фото подгружаются напрямую с CDN Unsplash нужного размера (`lib/unsplash-loader.ts`).

## Производительность и доступность

- Анимации через transform/opacity; GSAP-эффекты разделены через `gsap.matchMedia`
- `prefers-reduced-motion`: без Lenis, pin и 3D, все состояния сразу финальные
- 3D-комната грузится только на десктопе с мышью; если первые 3 с FPS < 38 — автоматический откат на SVG
- Перед публикацией замените домен `domus.kyiv.ua` в `app/layout.tsx`, `robots.ts`, `sitemap.ts`
